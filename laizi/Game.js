/**
 * Created by Administrator on 2018/3/17.
 */

var CMJCard = require("./MJCard");
var CMJGuiHelper = require("./MJGuiHelper");
var CPerson = require("./Person");
var CGame = {

    LAIZI_CARD:-1,
    testOne:function()
    {
        var cards = CMJCard.CloneInitCards();
        this.LAIZI_CARD = cards[parseInt(Math.random()*cards.length)];

        CPerson.Reset();
        var rand,outCard;
        for(var i=0;i<14;i++)
        {
            rand = parseInt(Math.random()*cards.length);
            outCard = cards.splice(rand,1);
            CPerson.AddCard(outCard);
        }
        CMJGuiHelper.isHu(CPerson);

    },
    testMoreTime:function(laizi,ay,time)
    {
        this.LAIZI_CARD = laizi;
        CPerson.Reset();
        for(var i=0;i<ay.length;i++)
        {
            CPerson.AddCard(ay[i]);
        }

        var startTimer = Date.now();
        var isHu = false;
        for(var i=0;i<time;i++)
        {
            isHu = CMJGuiHelper.isHu(CPerson);
        }
        console.log(Date.now()-startTimer + " isHU:"+isHu);
    }
}

module.exports = CGame;
//CGame.testMoreTime(23,[1,2, 4,5,6, 18, 23,23,23, 24,25,29, 31,31],1000*100);
var startTimer = Date.now();
for(var i=0;i<1000*100;i++)
{
    CGame.testOne();
}
console.log(Date.now()-startTimer);