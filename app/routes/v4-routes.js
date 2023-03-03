const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// ******* company-number validation ********************************
router.get('/v4/company-number', function (req, res) {
  // Set URl
  res.render('v4/company-number', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/company-number', function (req, res) {
  // Create empty array
  var errors = []
  var i = req.session.data['companyNumber'].toUpperCase();

  // Check if user has filled out a value
  if (req.session.data['companyNumber'] === '') {
    // No value so add error to array
    if (req.session.data['discrepancyType'] === 'PSC') {
      errors.push({
        text: 'The company number must be 8 characters long',
        href: '#companyNumber'
      })
    } else {
      errors.push({
        text: 'The Overseas entity ID number must start with OE followed by 6 numbers',
        href: '#companyNumber'
      })
    }

    // Re-show page with error value as true so errors will show
    res.render('v4/company-number', {
      errorNum: true,
      errorList: errors
    })
  } else if (i == '00000000' || i == 'OE000000')  {
    // User inputted specific value so move to secure page
    res.redirect('/v4/secure-psc')
  } else {
    // User inputted value so move to next page
    res.redirect('/v4/confirm-company')
  }
})

// ******* confirm-company redirect ********************************
router.get('/v4/confirm-company', function (req, res) {
  // Set URl
  res.render('v4/confirm-company', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/confirm-company', function (req, res) {
  res.redirect('/v4/psc-name')
})


// ******* discrepancy-details validation ********************************
router.get('/v4/discrepancy-details', function (req, res) {
  // Set URl
  res.render('v4/discrepancy-details', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/discrepancy-details', function (req, res) {
  var errors = []
  var discrepancyHasError = false

  if (req.session.data['discrepancyInfo'] === '') {
    discrepancyHasError = true
    errors.push({
      text: 'Enter the information that is incorrect',
      href: '#discrepancyInfo'
    })
  }

  // Check if ether filed not filled out
  if ( discrepancyHasError) {
    // Re-show page with error value as true so errors will show
    res.render('v4/discrepancy-details', {
      errorDiscrepancyInfo: discrepancyHasError,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v4/check-your-answers')
  }
})


// ******* check-your-answers redirect ********************************
router.get('/v4/check-your-answers', function (req, res) {
  // Set URl
  res.render('v4/check-your-answers', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/check-your-answers', function (req, res) {
  res.redirect('/v4/confirmation')
})


// ******* oblighed-entity-details-name validation ********************************
router.get('/v4/obliged-entity-details-name', function (req, res) {
  // Set URl
  res.render('v4/obliged-entity-details-name', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/obliged-entity-details-name', function (req, res) {
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
    res.render('v4/obliged-entity-details-name', {
      errorName: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v4/obliged-entity-email')
  }
})


// ******* psc-discrepancy-options validation ********************************
router.get('/v4/psc-discrepancy-options', function (req, res) {
  // Set URl
  res.render('v4/psc-discrepancy-options', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/psc-discrepancy-options', function (req, res) {
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
    res.render('v4/psc-discrepancy-options', {
      errorPscOptions: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v4/discrepancy-details')
  }
})


// ******* discrepancy-category validation ********************************
router.get('/v4/discrepancy-category', function (req, res) {
  // Set URl
  res.render('v4/discrepancy-category', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/discrepancy-category', function (req, res) {
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
    res.render('v4/discrepancy-category', {
      errorDiscrepancyCategory: true,
      errorList: errors
    })
  } else {
      // User inputted value so move to next page
      res.redirect('/v4/discrepancy-type')
    }
})


// ******* psc-name validation ********************************
router.get('/v4/psc-name', function (req, res) {
  // Set URl
  res.render('v4/psc-name', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/psc-name', function (req, res) {
  // Create empty array
  var errors = []
  var missing = (req.session.data['pscName'] == 'missing');

  // Check if user has filled out a value
  if (typeof req.session.data['pscName'] === 'undefined') {
    // No value so add error to array
    errors.push({
      text: 'Select the PSC with the discrepancy, or if a PSC is missing',
      href: '#pscName'
    })

    // Re-show page with error value as true so errors will show
    res.render('v4/psc-name', {
      errorPscName: true,
      errorList: errors
    })
  } else if (missing)  {
    req.session.data['pscOptions'] = 'missing'
    res.redirect('/v4/discrepancy-details')
    } else {
      res.redirect('/v4/psc-discrepancy-options')
    }
})


// ******* discrepancy-type validation ********************************
router.get('/v4/discrepancy-type', function (req, res) {
  // Set URl
  res.render('v4/discrepancy-type', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/discrepancy-type', function (req, res) {
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
    res.render('v4/discrepancy-type', {
      errorDiscrepancyType: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v4/obliged-entity-type')
  }
})


// ******* oblighed-entity-details-organisation validation ********************************
router.get('/v4/obliged-entity-details-organisation', function (req, res) {
  // Set URl
  res.render('v4/obliged-entity-details-organisation', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/obliged-entity-details-organisation', function (req, res) {
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
    res.render('v4/obliged-entity-details-organisation', {
      errorOrganisation: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v4/obliged-entity-details-name')
  }
})


// ******* oblighed-entity-email validation ********************************
router.get('/v4/obliged-entity-email', function (req, res) {
  // Set URl
  res.render('v4/obliged-entity-email', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/obliged-entity-email', function (req, res) {
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
    res.render('v4/obliged-entity-email', {
      errorEmail: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v4/company-number')
  }
})


// ******* oblighed-entity-type validation ********************************
router.get('/v4/obliged-entity-type', function (req, res) {
  // Set URl
  res.render('v4/obliged-entity-type', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/obliged-entity-type', function (req, res) {
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
    res.render('v4/obliged-entity-type', {
      errorType: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v4/obliged-entity-details-organisation')
  }
})



// ******* sign-in validation ********************************
router.get('/v4/sign-in', function (req, res) {
  // Set URl
  res.render('v4/sign-in', {
    currentUrl: req.originalUrl
  })
})

router.post('/v4/sign-in', function (req, res) {
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
    res.render('v4/sign-in', {
      errorEmail: emailHasError,
      errorPassword: passwordHasError,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v4/discrepancy-category')
  }
})

module.exports=router;

