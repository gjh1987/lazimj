var CMJCard = {
    CFG:{
        WAN:[1,2,3,4,5,6,7,8,9],
        TIAO:[11,12,13,14,15,16,17,18,19],
        TONG:[21,22,23,24,25,26,27,28,29],
        FENG:[31,33,35,37],
        ZI:[41,43,45]
    },
    CARDS:[],
    Helper:{
        addACard:function(ay,card)
        {
            ay.push(card);
            ay.push(card);
            ay.push(card);
            ay.push(card);
        },
        init:function()
        {
            var cfg = CMJCard.CFG;
            var initCards = CMJCard.CARDS;
            for(var key in cfg)
            {
                for(var i=0;i<cfg[key].length;i++)
                {
                    this.addACard(initCards,cfg[key][i]);
                }
            }
        }
    },
    CloneInitCards:function()
    {
        return [].concat(this.CARDS);
    }
}
CMJCard.Helper.init();

module.exports = CMJCard;