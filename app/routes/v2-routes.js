const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// ******* Company number validation ********************************
router.get('/v2/company-number', function (req, res) {
  // Set URl
  res.render('v2/company-number', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/company-number', function (req, res) {
  // Create empty array
  var errors = []
  var i = req.session.data['companyNumber'].toUpperCase();

  // Check if user has filled out a value
  if (req.session.data['companyNumber'] === '') {
    // No value so add error to array
    errors.push({
      text: 'The company number or Overseas Entity ID must be 8 characters long',
      href: '#companyNumber'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/company-number', {
      errorNum: true,
      errorList: errors
    })
  } else if (i == '00000000' || i == 'OE000000')  {
    // User inputted value so move to next page
    res.redirect('/v2/secure-psc')
  } else {
    if (i.slice(0, 2) == 'OE' ) {
      req.session.data['discrepancyType'] = 'beneficial owner'
    } else {
      req.session.data['discrepancyType'] = 'PSC'
    }
    // User inputted value so move to next page
    res.redirect('/v2/confirm-company')
  }
})

// ******* Confirm Company redirect ********************************
router.get('/v2/confirm-company', function (req, res) {
  // Set URl
  res.render('v2/confirm-company', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/confirm-company', function (req, res) {
  res.redirect('/v2/psc-name')
})


// ******* Discrepancy details validation ********************************
router.get('/v2/discrepancy-details', function (req, res) {
  // Set URl
  res.render('v2/discrepancy-details', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/discrepancy-details', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (req.session.data['discrepancyInfo'] === ''){
    // No value so add error to array
    errors.push({
      text: 'Enter the information that is incorrect',
      href: '#discrepancyInfo'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/discrepancy-details', {
      errorDiscrepancyInfo: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v2/check-your-answers')
  }
})


// ******* Check your answers redirect ********************************
router.get('/v2/check-your-answers', function (req, res) {
  // Set URl
  res.render('v2/check-your-answers', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/check-your-answers', function (req, res) {
  res.redirect('/v2/confirmation')
})


// ******* Oblighed entity name validation ********************************
router.get('/v2/obliged-entity-details-name', function (req, res) {
  // Set URl
  res.render('v2/obliged-entity-details-name', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/obliged-entity-details-name', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (req.session.data['fullName'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter your name',
      href: '#fullName'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/obliged-entity-details-name', {
      errorName: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v2/obliged-entity-email')
  }
})


// ******* psc options validation ********************************
router.get('/v2/psc-discrepancy-options', function (req, res) {
  // Set URl
  res.render('v2/psc-discrepancy-options', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/psc-discrepancy-options', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['pscOptions'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select the type of discrepancy you are reporting',
      href: '#pscOptions'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/psc-discrepancy-options', {
      errorPscOptions: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v2/discrepancy-details')
  }
})


// ******* discrepancy category validation ********************************
router.get('/v2/discrepancy-category', function (req, res) {
  // Set URl
  res.render('v2/discrepancy-category', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/discrepancy-category', function (req, res) {
  // Create empty array
  var errors = [];
  var i = req.session.data['discrepancyCategory'];

  // Check if user has filled out a value
  if (typeof req.session.data['discrepancyCategory'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select what the discrepancy you are reporting relates to',
      href: '#discrepancyCategory'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/discrepancy-category', {
      errorDiscrepancyCategory: true,
      errorList: errors
    })
  } else {
      // User inputted value so move to next page
      res.redirect('/v2/obliged-entity-type')
    }
})


// ******* psc name validation ********************************
router.get('/v2/psc-name', function (req, res) {
  // Set URl
  res.render('v2/psc-name', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/psc-name', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['pscName'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select the PSC with the discrepancy, or if a PSC is missing',
      href: '#pscName'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/psc-name', {
      errorPscName: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v2/psc-discrepancy-options')
  }
})


// ******* discrepancy type validation ********************************
router.get('/v2/discrepancy-type', function (req, res) {
  // Set URl
  res.render('v2/discrepancy-type', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/discrepancy-type', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['discrepancyType'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select a discrepancy type',
      href: '#discrepancyType'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/discrepancy-type', {
      errorDiscrepancyType: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v2/obliged-entity-type')
  }
})


// ******* Oblighed entity org validation ********************************
router.get('/v2/obliged-entity-details-organisation', function (req, res) {
  // Set URl
  res.render('v2/obliged-entity-details-organisation', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/obliged-entity-details-organisation', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (req.session.data['organisationName'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter your organisation name',
      href: '#organisationName'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/obliged-entity-details-organisation', {
      errorOrganisation: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v2/obliged-entity-details-name')
  }
})


// ******* Oblighed entity email validation ********************************
router.get('/v2/obliged-entity-email', function (req, res) {
  // Set URl
  res.render('v2/obliged-entity-email', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/obliged-entity-email', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (req.session.data['email'] === '') {
    // No value so add error to array
    errors.push({
      text: 'Enter your email address',
      href: '#email'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/obliged-entity-email', {
      errorEmail: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v2/company-number')
  }
})


// ******* Oblighed entity validation ********************************
router.get('/v2/obliged-entity-type', function (req, res) {
  // Set URl
  res.render('v2/obliged-entity-type', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/obliged-entity-type', function (req, res) {
  // Create empty array
  var errors = []

  // Check if user has filled out a value
  if (typeof req.session.data['obligedType'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select what type of obliged entity you are',
      href: '#obligedType'
    })

    // Re-show page with error value as true so errors will show
    res.render('v2/obliged-entity-type', {
      errorType: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v2/obliged-entity-details-organisation')
  }
})



// ******* Sign in validation ********************************
router.get('/v2/sign-in', function (req, res) {
  // Set URl
  res.render('v2/sign-in', {
    currentUrl: req.originalUrl
  })
})

router.post('/v2/sign-in', function (req, res) {
  // Create empty array and set error variables to false
  var errors = []
  var emailHasError = false
  var passwordHasError = false

  // Check if user has filled out a email
  if (req.session.data['emailAddress'] === '') {
    // No value so add error to array
    emailHasError = true
    errors.push({
      text: 'Enter your email address',
      href: '#emailAddress'
    })
  }

  // Check if user has filled out a password
  if (req.session.data['password'] === '') {
    // No value so add error to array
    passwordHasError = true
    errors.push({
      text: 'Enter your password',
      href: '#password'
    })
  }

  // Check if eother filed not filled out
  if (emailHasError || passwordHasError) {
    // Re-show page with error value as true so errors will show
    res.render('v2/sign-in', {
      errorEmail: emailHasError,
      errorPassword: passwordHasError,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v2/discrepancy-category')
  }
})

module.exports=router;

