// 
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
// 
const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// ******* Company number validation ********************************
  router.get('/v1/company-number', function (req, res) {
    // Set URl
    res.render('v1/company-number', {
      currentUrl: req.originalUrl
    })
  })
  
  router.post('/v1/company-number', function (req, res) {
    // Create empty array
    var errors = []

    // Check if user has filled out a value
    if (req.session.data['companyNumber'] === '') {
      // No value so add error to array
      errors.push({
        text: 'The company number must be 8 characters long',
        href: '#companyNumber'
      })

      // Re-show page with error value as true so errors will show
      res.render('v1/company-number', {
        errorNum: true,
        errorList: errors
      })
    } else {
      // User inputted value so move to next page
      res.redirect('/v1/confirm-company')
    }
  })
  

  // ******* Confirm Company redirect ********************************
  router.get('/v1/confirm-company', function (req, res) {
    // Set URl
    res.render('v1/confirm-company', {
      currentUrl: req.originalUrl
    })
  })
  
  router.post('/v1/confirm-company', function (req, res) {
    res.redirect('/v1/psc-name')
  })


  // ******* Discrepancy details validation ********************************
  router.get('/v1/discrepancy-details', function (req, res) {
    // Set URl
    res.render('v1/discrepancy-details', {
      currentUrl: req.originalUrl
    })
  })
  
  router.post('/v1/discrepancy-details', function (req, res) {
    // Create empty array
    var errors = []

    // Check if user has filled out a value
    if (req.session.data['discrepancyInfo'] === ''){
      // No value so add error to array
      errors.push({
        text: 'Enter the information that is incorrect for the PSC',
        href: '#discrepancyInfo'
      })

      // Re-show page with error value as true so errors will show
      res.render('v1/discrepancy-details', {
        errorDiscrepancyInfo: true,
        errorList: errors
      })
    } else {
      // User inputted value so move to next page
      res.redirect('/v1/check-your-answers')
    }
  })


  // ******* Discrepancy details redirect ********************************
  router.get('/v1/check-your-answers', function (req, res) {
    // Set URl
    res.render('v1/check-your-answers', {
      currentUrl: req.originalUrl
    })
  })
  
  router.post('/v1/check-your-answers', function (req, res) {
    res.redirect('/v1/confirmation')
  })


  // ******* Oblighed entity name validation ********************************
  router.get('/v1/obliged-entity-details-name', function (req, res) {
    // Set URl
    res.render('v1/obliged-entity-details-name', {
      currentUrl: req.originalUrl
    })
  })
  
  router.post('/v1/obliged-entity-details-name', function (req, res) {
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
      res.render('v1/obliged-entity-details-name', {
        errorName: true,
        errorList: errors
      })
    } else {
      // User inputted value so move to next page
      res.redirect('/v1/obliged-entity-email')
    }
  })


  // ******* psc options validation ********************************
  router.get('/v1/psc-discrepancy-options', function (req, res) {
    // Set URl
    res.render('v1/psc-discrepancy-options', {
      currentUrl: req.originalUrl
    })
  })
  
  router.post('/v1/psc-discrepancy-options', function (req, res) {
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
      res.render('v1/psc-discrepancy-options', {
        errorPscOptions: true,
        errorList: errors
      })
    } else {
      // User inputted value so move to next page
      res.redirect('/v1/discrepancy-category')
    }
  })


  // ******* discrepancy category validation ********************************
  router.get('/v1/discrepancy-category', function (req, res) {
    // Set URl
    res.render('v1/discrepancy-category', {
      currentUrl: req.originalUrl
    })
  })
  
  router.post('/v1/discrepancy-category', function (req, res) {
    // Create empty array
    var errors = []

    // Check if user has filled out a value
    if (typeof req.session.data['DiscrepancyCategory'] === 'undefined') {
      // No value so add error to array
      errors.push({
        text: 'Select what the discrepancy you are reporting relates to',
        href: '#DiscrepancyCategory'
      })

      // Re-show page with error value as true so errors will show
      res.render('v1/discrepancy-category', {
        errorDiscrepancyCategory: true,
        errorList: errors
      })
    } else {
      // User inputted value so move to next page
      res.redirect('/v1/discrepancy-details')
    }
  })


  // ******* psc name validation ********************************
  router.get('/v1/psc-name', function (req, res) {
    // Set URl
    res.render('v1/psc-name', {
      currentUrl: req.originalUrl
    })
  })
  
  router.post('/v1/psc-name', function (req, res) {
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
      res.render('v1/psc-name', {
        errorPscName: true,
        errorList: errors
      })
    } else {
      // User inputted value so move to next page
      res.redirect('/v1/psc-discrepancy-options')
    }
  })


  // ******* discrepancy type validation ********************************
  router.get('/v1/discrepancy-type', function (req, res) {
    // Set URl
    res.render('v1/discrepancy-type', {
      currentUrl: req.originalUrl
    })
  })
  
  router.post('/v1/discrepancy-type', function (req, res) {
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
      res.render('v1/discrepancy-type', {
        errorDiscrepancyType: true,
        errorList: errors
      })
    } else {
      // User inputted value so move to next page
      res.redirect('/v1/company-number')
    }
  })


  // ******* Oblighed entity org validation ********************************
  router.get('/v1/obliged-entity-details-organisation', function (req, res) {
    // Set URl
    res.render('v1/obliged-entity-details-organisation', {
      currentUrl: req.originalUrl
    })
  })
  
  router.post('/v1/obliged-entity-details-organisation', function (req, res) {
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
      res.render('v1/obliged-entity-details-organisation', {
        errorOrganisation: true,
        errorList: errors
      })
    } else {
      // User inputted value so move to next page
      res.redirect('/v1/obliged-entity-details-name')
    }
  })


  // ******* Oblighed entity email validation ********************************
  router.get('/v1/obliged-entity-email', function (req, res) {
    // Set URl
    res.render('v1/obliged-entity-email', {
      currentUrl: req.originalUrl
    })
  })
  
  router.post('/v1/obliged-entity-email', function (req, res) {
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
      res.render('v1/obliged-entity-email', {
        errorEmail: true,
        errorList: errors
      })
    } else {
      // User inputted value so move to next page
      res.redirect('/v1/discrepancy-type')
    }
  })


// ******* Oblighed entity validation ********************************
router.get('/v1/obliged-entity-type', function (req, res) {
  // Set URl
  res.render('v1/obliged-entity-type', {
    currentUrl: req.originalUrl
  })
})

router.post('/v1/obliged-entity-type', function (req, res) {
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
    res.render('v1/obliged-entity-type', {
      errorType: true,
      errorList: errors
    })
  } else {
    // User inputted value so move to next page
    res.redirect('/v1/obliged-entity-details-organisation')
  }
})



// ******* Sign in validation ********************************
  router.get('/v1/sign-in', function (req, res) {
    // Set URl
    res.render('v1/sign-in', {
      currentUrl: req.originalUrl
    })
  })
  
  router.post('/v1/sign-in', function (req, res) {
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
      res.render('v1/sign-in', {
        errorEmail: emailHasError,
        errorPassword: passwordHasError,
        errorList: errors
      })
    } else {
      // User inputted value so move to next page
      res.redirect('/v1/obliged-entity-type')
    }
  })
