var models = require('../models');

// exports is used to make parts of your module 
// availible to scripts outside the module
// i.e. var mucode = require('./path/to/mycode')
// res is an object containing information about the 
// HTTP request that raised the event
// In response to req, you use res to send back
// the desired HTTP response  
exports.projectInfo = function(req, res) {
  var projectID = req.params.id;

    // Retrieving Documents; this is a query 
    models.Project //Which type of document we're looking for
      .find({"_id": projectID})
      .exec(afterQuery);

  // query for the specific project and 
  // call the following callback 
  // projects is a query result; the result is always an array of documents
  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  var newProject = new models.Project({
    "title": form_data["project-title"],
    "date": form_data["date"], 
    "summary": form_data["summary"], 
    "image": form_data["image_url"]
  }); 

  newProject.save(afterSaving); 

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
  function afterSaving(err){
    if(err) {console.log(err);}
    res.send(); 
  }
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  models.Project
    .find({"_id": projectID})
    .remove()
    .exec(afterRemoving); 

  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
  function afterRemoving(err){
    res.send(); 
  }
}