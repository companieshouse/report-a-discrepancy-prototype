// 
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
// 

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// Run this code when a form is submitted to 'juggling-balls-answer'
router.post('/update-discrepancy-type', function (req, res) {
    // Set number of checkboxes checked
    var num_checks = (req.session.data['psc-options']).length;

    // Set count to one more
    var count = parseInt(req.session.data['discrepancy-count']) +1;
    req.session.data['discrepancy-count'] = count.toString();

    // Get the next checkbox in the list
    var discrepancy_type = req.session.data['psc-options'][count]
    req.session.data['disc-type'] = discrepancy_type;

    if (count == num_checks) {
        // next page
        res.redirect('/v1/discrepancy-details')
     } else {
        // reload page with updated type
        res.redirect('/v1/discrepancy-catagory')
     }
  
})