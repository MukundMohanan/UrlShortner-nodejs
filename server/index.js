const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const yup = require('yup');
const monk = require('monk');
const { nanoid } = require('nanoid');

require('dotenv').config();

const db = monk(process.env.MONGO_URI);
const urls = db.get('urls');
urls.createIndex({ slug: 1 }, { unique: true });

const app = express();


app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));




app.get('/:id', async (req,res,next) => {
    const { id: slug } = req.params;
    try{
        const url = await urls.findOne({ slug });
        if(url){
            res.redirect(url.url);
        }
        res.redirect(`/?error=${slug} not found`);
    } catch (error) {
        res.redirect(`/?error=Link not found`);
    }
    
    
});

//slug here will be the unique id for url or the url created by the users
const schema = yup.object().shape({
    slug : yup.string().trim().matches(/^$|[\w\-]/i),
    url : yup.string().trim().url().required(),
})

app.post('/url', async (req,res,next) => {
    //create short url
    let { slug, url } = req.body;
    try{
        await schema.validate({
            slug,
            url,
        });
        if(!slug){
            slug = nanoid(5);
        }
        else {
            const existing = await urls.findOne({ slug });
            if(existing){
                throw new Error('Slug in use!');
            }
        }
        slug = slug.toLowerCase();
        const newUrl = {
            url,
            slug,
        }
        const created = await urls.insert(newUrl);
        res.json(created);
    }
    catch(error){
        next(error);
    }

});

//error handler
app.use((error,req,res,next) => {
    if(error.status){
        res.status(error.status);
    }
    else {
        res.status(500);
    }
    res.json({
        message : error.essage,
        stack : process.env.NODE_ENV === 'production' ? '❤' : error.stack,
    })
});

const port = process.env.PORT || 7890;
app.listen(port, () => {
    console.log(`listening at ${port}`);
    
})
