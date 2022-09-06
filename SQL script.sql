use movietbd;
-- creating user table

drop table if exists booking;
drop tables if exists user;
drop tables if exists cinema;
drop tables if exists movie;

create table if not exists user
(
user_id int not null auto_increment,
user_name varchar(100) not null,
user_email varchar(100) not null,
primary key(user_id),
unique(user_name,user_email)	
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- insert users
insert into user (user_name,user_email) values ('Sam','sam@gmail.com');
insert into user (user_name,user_email) values ('Jam','jam@gmail.com');
insert into user (user_name,user_email) values ('AK','AK@gmail.com');
-- add users by admin
START TRANSACTION; LOCK TABLES user WRITE; INSERT INTO user (user_name,user_email) values ('Jaysheel','jaysheel@gmail.com'); UNLOCK TABLES; 
-- delete users by admin
START TRANSACTION; LOCK TABLES user WRITE; delete from user where user_name ='Sam' and user_email=+'sam@gmail.com'; UNLOCK TABLES;

-- creating movie table

create table if not exists movie
(
movie_id int not null auto_increment,
movie_name varchar(100) not null,
movie_language varchar(30) not null,
primary key(movie_id),
unique(movie_name,movie_language)	
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- inserting some movies 


insert into movie (movie_name,movie_language) values ('kf','hindi');
insert into movie (movie_name,movie_language) values ('kgf','hindi');
insert into movie (movie_name,movie_language) values ('war','english');
insert into movie (movie_name,movie_language) values ('war','hindi');

-- add movies by admin
START TRANSACTION; LOCK TABLES MOVIE WRITE; insert into movie (movie_name,movie_language) values ('kashmir files','hindi'); UNLOCK TABLES;

-- delete movies by admin
START TRANSACTION;LOCK TABLES MOVIE WRITE;delete from movie where movie_name = "kg" and movie_language= "hindi"; UNLOCK TABLES;

-- creating cinema table

create table if not exists cinema
(
cinema_id int not null auto_increment,
cinema_name varchar(100) not null,
cinema_location varchar(100) not null,
primary key(cinema_id),
unique(cinema_name,cinema_location)	
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- inserting values in cinema table

insert into cinema (cinema_name,cinema_location) values ('PVR','Gujarat');
insert into cinema (cinema_name,cinema_location) values ('INOX','Rajasthan');

-- add cinema by admin

START TRANSACTION; LOCK TABLES CINEMA WRITE; insert into cinema (cinema_name,cinema_location) values ('PVR','Rajasthan'); UNLOCK TABLES;

-- delete cinema by admin

START TRANSACTION;LOCK TABLES CINEMA WRITE; delete from cinema where cinema_name = "INOX" and cinema_location="Rajasthan"; UNLOCK TABLES;

-- creating booking table

create table if not exists booking
(
booking_id int not null auto_increment,
time_slot int not null,
seat_no int not null,
movie_id int not null,
cinema_id int not null,
user_id int not null,
primary key(booking_id),
foreign key(movie_id) references movie(movie_id) on delete cascade,
foreign key(cinema_id) references cinema(cinema_id) on delete cascade,
foreign key(user_id) references user(user_id) on delete cascade,
unique(time_slot,seat_no,movie_id,cinema_id,user_id)	
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- booking done by the users


START TRANSACTION; LOCK TABLES booking WRITE,movie READ,cinema READ,user READ; 
insert into booking (movie_id,cinema_id,user_id,time_slot,seat_no) values ((select movie_id from movie where movie_name= "Kashmir files" and movie_language="hindi"),(select cinema_id from cinema where cinema_name="PVR" and cinema_location="Rajasthan"),(select user_id from user where user_name="Jaysheel" and user_email="jaysheel@gmail.com"),1,9);
Unlock Tables;

-- cancel booking done by the users

START TRANSACTION;LOCK TABLES booking WRITE,movie READ,cinema READ,user READ;
delete from booking where movie_id=(select movie_id from movie where movie_name="Kashmir Files" and movie_language="hindi") and cinema_id=(select cinema_id from cinema where cinema_name="PVR" and cinema_location ="Rajasthan") and user_id=(select user_id from user where user_name="Jaysheel" and user_email="jaysheel@gmail.com") and time_slot="1" and seat_no="9";
UNLOCK TABLES;





 













