const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';



class Field{
    constructor(twoDimensionalArray){
        this.field = twoDimensionalArray;
    }

    print(){
        let x = '';
        for(let i = 0 ; i < (this.field).length ; i++){
            for(let j=0; j < this.field[i].length ; j++){ 
                x += this.field[i][j];
            } 
            console.log(x);
            x = '';
        }
    }

    getWH(){
        return {width: this.field.length , height: this.field[0].length};
    }

    static generateField(x,y,percentage){
        // Create array and fill with fieldCharacter 
        let myArray = [];

        for(let i=0;i<y;i++){
            myArray.push([]);
        }

        for(let i=0;i<y;i++){
            for(let j=0;j<x;j++){
                myArray[i].push(fieldCharacter);
            }
        }
        

        //Find a random place to put the hat    
        let width,height; 

        do {
          width = Math.floor(Math.random() * x);
          height = Math.floor(Math.random() * y);
        } while ( width == 0 && height == 0 );
 

        //Place hat at random place except starting point
        myArray[height][width] = hat;
        
 

        //Place holes via percentage
        let hundred = x * y; 
        let holes =  Math.floor((hundred * percentage) / 100);
        console.log(holes); //
        let posX , posY;
        

        for(let i=0 ; i < holes ; i++){

            do {
                posX = Math.floor(Math.random() * x);
                posY = Math.floor(Math.random() * y);
            } while ( myArray[posY][posX]==pathCharacter  ||  myArray[posY][posX]==hat || myArray[posY][posX] == hole  );
        
            myArray[posY][posX] = hole; 
        }
                
        //Set start
        myArray[0][0] = pathCharacter;
        return myArray;
    }
}

const myField = new Field(Field.generateField(6,6,50));


let position = { verticalPos: 0 ,horizontalPos: 0};
 



 



//status
let redFlag = 0;
let win = 0;


while(redFlag ==  0 && win == 0){
    // Print field
    myField.print();

    // Get move 
    let move = prompt("Which way ? (l->left,r->right,u->up,d->down) : "); 
    console.log(move);

    //Make move 
    if(move == 'l'){
        position.horizontalPos--;
    }else if(move == 'r'){
        position.horizontalPos++;
    }else if(move == 'u'){
        position.verticalPos--;
    }else if(move == 'd'){
        position.verticalPos++;
    }
 

    // Check if the user went out the field or fall into a hole or won by finding the hat 
    if(position.horizontalPos < 0 || position.horizontalPos >= myField.getWH().width){
        redFlag = 1;
        break;
    }else if(position.verticalPos < 0 || position.verticalPos >= myField.getWH().height){
        redFlag = 1;
        break;
    }
    
      
    if(myField.field[position.verticalPos][position.horizontalPos]  == hole){ 
        redFlag = 2; 
        break;
    }else if(myField.field[position.verticalPos][position.horizontalPos]  == hat){ 
        win = 1;
        break;
    }
    
    //If none of this happened means that we are in the field so change the decoration to *
    myField.field[position.verticalPos][position.horizontalPos] = pathCharacter;
    //Continue in the loop until we find the hat or lose 
}



if(win == 1){
    console.log("You found the hat you won! ");
}else{
    if(redFlag == 1){
        console.log("You went out the field . You lose !");
    }else{
        console.log("You fall into a hole. You lose !");
    }

}

console.log("################### GAME END ############################ ");





console.log();