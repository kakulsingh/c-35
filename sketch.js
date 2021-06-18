var ball;
var database,position;
function setup(){
    database=firebase.database()
    createCanvas(500,500);
    
    //creating a database from firebase database and storing it inside a varaible database
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var locofchild=database.ref("ball/position")
    //referring to this location using .ref function,now from this location i want to cotinuously read x and y values
    //.on function is used to read value,value is a predefined string
    locofchild.on("value",readop,showerror)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    //for multiplayer game we need to synchronized our data somewhere so we r using firebase console
    //firebase is a platform developed by google for ceating web & mobile applications
    //we need to generate some confuguration keys whivh we put inside index.html 
    //this connect database to code
    //firebase database is json....javascript...i.e curly bracket
    //if we move left ,right etc x and y positions in database is also updated
    //to write data in database again we hv to refer to the loc of child
    //.set is used to write inside the database
    database.ref("ball/position").set({
        x:ball.x+x,
        y:ball.y+y,
    })

   
}
function readop(data){
    //parameter =data which means we can store some value inside it (value which we are reading from database)
    position=data.val()
    ball.x=position.x
    ball.y=position.y
}
function showerror(){
    console.log("error")
}
