var express = require('express');
var router = express.Router();
var db=require('../database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('Frontpage.ejs');
});

router.get('/add_movie', function(req, res, next) { 
  res.render('add_movie.ejs'); 
});


router.post('/create', function(req, res, next) {
  
  // store all the user input data
  const userDetails=req.body;
  
  // insert user data into users table
  var sql = 'START TRANSACTION; LOCK TABLES MOVIE WRITE; INSERT INTO movie SET ?;UNLOCK TABLES;';
  console.log(sql);
  db.query(sql, userDetails,function (err, data) { 
      if (err) throw err;
         console.log("User data is inserted successfully "); 
  });
 res.redirect('/users/add_movie');  // redirect to user form page after inserting the data
}); 

router.get('/movie', function(req, res, next) {
  
  // store all the user input data
  // const userDetails=req.body;
  
  // insert user data into users table
  var sql = 'START TRANSACTION;LOCK TABLES MOVIE READ;';
  db.query(sql,function (err, data) { 
    if (err) throw err;
      //  res.send(data); 
  });
  var sql2 = "Select * from movie;";
  db.query(sql2,function (err, data) { 
    if (err) throw err;
       res.send(data); 
  });
  var sql3 = "UNLOCK TABLES;";
  db.query(sql2,function (err, data) { 
    if (err) throw err;
      //  res.send(data); 
  });
  
//  res.redirect('/users/form');  // redirect to user form page after inserting the data
});

/* now easy */

/* Routes to static pages*/

router.get('/book_cancel_tickets', function(req, res, next) { 
  res.render('book_cancel_tickets.ejs'); 
});

router.get('/Admin_Page', function(req, res, next) { 
  res.render('Admin_Page.ejs'); 
});

router.get('/add_movie', function(req, res, next) { 
  res.render('add_movie.ejs'); 
});

router.get('/add_cinema', function(req, res, next) { 
  res.render('add_cinema.ejs'); 
});

router.get('/add_user', function(req, res, next) { 
  res.render('add_user.ejs'); 
});

router.get('/delete_movie', function(req, res, next) { 
  res.render('delete_movie.ejs'); 
});

router.get('/delete_cinema', function(req, res, next) { 
  res.render('delete_cinema.ejs'); 
});

router.get('/delete_user', function(req, res, next) { 
  res.render('delete_user.ejs'); 
});

router.get('/Book_Tickets', function(req, res, next) { 
  res.render('Book_Tickets.ejs'); 
});

router.get('/cancel_ticket', function(req, res, next) { 
  res.render('cancel_ticket.ejs'); 
});


/* Routes similar to add_movie */

router.post('/create1', function(req, res, next) {
  
  const userDetails=req.body;
  
  var sql = 'START TRANSACTION; LOCK TABLES CINEMA WRITE; INSERT INTO cinema SET ?;UNLOCK TABLES;';
  db.query(sql, userDetails,function (err, data) { 
      if (err) throw err;
         console.log("User data is inserted successfully "); 
  });
 res.redirect('/users/add_cinema');  // redirect to user form page after inserting the data
}); 

router.get('/cinema', function(req, res, next) {
  
  var sql = 'START TRANSACTION;LOCK TABLES CINEMA READ;';
  db.query(sql,function (err, data) { 
    if (err) throw err;
      //  res.send(data); 
  });
  var sql2 = 'Select * from cinema;';
  db.query(sql2,function (err, data) { 
    if (err) throw err;
       res.send(data); 
  });
  var sql3 = 'UNLOCK TABLES;';
  db.query(sql3,function (err, data) { 
    if (err) throw err;
      //  res.send(data); 
  });
  
});

router.get('/booking', function(req, res, next) {
  
  var sql = 'START TRANSACTION;LOCK TABLES BOOKING READ;';
  db.query(sql,function (err, data) { 
    if (err) throw err; 
  });
  var sql2 = 'Select * from booking;';
  db.query(sql2,function (err, data) { 
    if (err) throw err;
       res.send(data); 
  });
  var sql3 = 'UNLOCK TABLES;';
  db.query(sql3,function (err, data) { 
    if (err) throw err;
      
  });
  
});


router.get('/user', function(req, res, next) {
  
  var sql = 'START TRANSACTION;LOCK TABLES user READ;';
  db.query(sql,function (err, data) { 
    if (err) throw err;
      
  });
  var sql2 = 'Select * from user;';
  db.query(sql2,function (err, data) { 
    if (err) throw err;
       res.send(data); 
  });
  var sql3 = 'UNLOCK TABLES;';
  db.query(sql3,function (err, data) { 
    if (err) throw err;
      
  });
  
});

router.post('/create2', function(req, res, next) {
  
  var name = req.body.movie_name;
  var language = req.body.movie_language;
  var sql = 'START TRANSACTION;LOCK TABLES MOVIE WRITE;delete from movie where movie_name = ' + '"' +name + '" ' +' and movie_language= ' + '"' + language + '" ' +';UNLOCK TABLES;';
  console.log(sql); // steps to debug (in all Q logic 100% clear, only implement --> debug at all level by print. )
 
  db.query(sql, function(err, data) { 
      if (err) throw err;
         console.log("User data is deleted successfully "); 
  });
 res.redirect('/users/delete_movie');  // redirect to user form page after deleting the data
}); 


router.post('/create3', function(req, res, next) {
  
  // store all the user input data
  var name = req.body.cinema_name;
  var location = req.body.cinema_location;
  // insert user data into users table
  var sql = 'START TRANSACTION;LOCK TABLES CINEMA WRITE; delete from cinema where cinema_name = ' + '"' +name + '" ' +' and cinema_location= ' + '"' + location + '" ' +';UNLOCK TABLES;';
  db.query(sql,function (err, data) { 
      if (err) throw err;
         console.log("User data is deleted successfully "); 
  });
 res.redirect('/users/delete_cinema');  // redirect to user form page after deleting the data
});


router.post('/create4', function(req, res, next) {
  
  // store all the user input data
  var name= req.body.user_name;
  var email= req.body.user_email;
  var name1 = req.body.movie_name;
  var language = req.body.movie_language;
  var name2 = req.body.cinema_name;
  var location = req.body.cinema_location;
  var time_s = req.body.time_slot;
  var seat_n = req.body.seat_no;  
  var sql = 'START TRANSACTION;LOCK TABLES booking WRITE,movie READ,cinema READ,user READ;insert into booking (movie_id,cinema_id,user_id,time_slot,seat_no) values ((select movie_id from movie where movie_name="'+ name1 +'" and movie_language="'+language+'"),(select cinema_id from cinema where cinema_name="'+name2+'" and cinema_location="'+location+'"),(select user_id from user where user_name="'+ name + '" and user_email="'+ email +'"),'+time_s+ ','+seat_n+');UNLOCK TABLES;'
  db.query(sql,function (err, data) { 
      if (err) throw err;
         console.log("Booking data is inserted successfully "); 
  });
 res.redirect('/users/Book_Tickets');  // redirect to user form page after inserting the data
});


router.post('/create5', function(req, res, next) {
  
  // store all the user input data
  var name= req.body.user_name;
  var email= req.body.user_email;
  var name1 = req.body.movie_name;
  var language = req.body.movie_language;
  var name2 = req.body.cinema_name;
  var location = req.body.cinema_location;
  var time_s = req.body.time_slot;
  var seat_n = req.body.seat_no;
  
  
  
  var sql = 'START TRANSACTION;LOCK TABLES booking WRITE,movie READ,cinema READ,user READ;delete from booking where movie_id=(select movie_id from movie where movie_name="'+ name1 + '" and movie_language="'+language+'") and cinema_id=(select cinema_id from cinema where cinema_name="'+name2+'" and cinema_location ="'+location+'") and user_id=(select user_id from user where user_name="'+name+'" and user_email="'+email+'") and time_slot=' + time_s + ' and seat_no=' + seat_n + ';UNLOCK TABLES;'
  db.query(sql,function (err, data) { 
      if (err) throw err;
         console.log("Booking data is deleted successfully "); 
  });
  res.redirect('/users/cancel_ticket');  // redirect to user form page after deleting the data
});

router.post('/create6', function(req, res, next) {
  
  // store all the user input data
  const userDetails=req.body;
  
  // insert user data into users table
  var sql = 'START TRANSACTION; LOCK TABLES user WRITE; INSERT INTO user SET ?;UNLOCK TABLES;';
  // console.log(sql);
  db.query(sql, userDetails,function (err, data) { 
      if (err) throw err;
         console.log("User data is inserted successfully "); 
  });
 res.redirect('/users/add_user');  // redirect to user form page after inserting the data
}); 

router.post('/create7', function(req, res, next) {
  
  // store all the user input data
  var name = req.body.user_name;
  var email = req.body.user_email;
  var sql = 'START TRANSACTION;LOCK TABLES user WRITE;delete from user where user_name = ' + '"' +name + '" ' +' and user_email= ' + '"' + email + '" ' +';UNLOCK TABLES;';

  db.query(sql, function(err, data) { 
      if (err) throw err;
         console.log("User data is deleted successfully "); 
  });
  res.redirect('/users/delete_user');  
}); 

module.exports = router;

