/**
 * Created by Administrator on 2018/3/17.
 */
var CPerson = {
    Reset:function()
    {
        this.Cards = {
            0:[],
            1:[],
            2:[],
            3:[],
            4:[],
        }
        this.CardCount = 0;
        this.m_BaoNum = 0;
    },
    AddCard:function(card)
    {
        this.CardCount++;

        if(card == CGame.LAIZI_CARD)
        {
            this.m_BaoNum++;
        }
        else
        {
            var idx = parseInt(card/10);
            this.Cards[idx].push(card);
        }
    }
}
module.exports = CPerson;
var CGame = require("./Game");
