const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = require('express').Router()

let client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const counterPracticaEndpoint = new client.Counter({
    name: `_endpoint`,
    help: `Total de peticiones para el endpoint`
})

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
router.use(morgan('dev'))


router.use('/metrics', (req, res) => {
    res.set('Content-Type', client.register.contentType);
    client.register.metrics().then(data => res.send(data))
});

router.use('/products', (req, res, next) => { counterPracticaEndpoint.inc(); next() }, require('./product.route'))
router.use('/categories', (req, res, next) => { counterPracticaEndpoint.inc(); next() }, require('./category.route'))
router.use('/productsXcategory', (req, res, next) => { counterPracticaEndpoint.inc(); next() }, require('./productsXcategory.route'))
router.use('/auth', (req, res, next) => { counterPracticaEndpoint.inc(); next() }, require('./user.routes'))
router.use('/profile', (req, res, next) => { counterPracticaEndpoint.inc(); next() }, require('./profile.routes'))
router.use('/comments', (req, res, next) => { counterPracticaEndpoint.inc(); next() }, require('./comments.routes'))

module.exports = router;