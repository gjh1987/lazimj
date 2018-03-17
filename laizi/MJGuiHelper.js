/**
 * Created by Administrator on 2018/3/17.
 */
var CMJGuiHelper = {
    CheckHelper:{
        "nj":{
            0:require("./table/gui/no_gui_table"),
            1:require("./table/gui/one_gui_table"),
            2:require("./table/gui/two_gui_table"),
            3:require("./table/gui/three_gui_table")
        },
        "j":{
            0:require("./table/gui/no_gui_eye_table"),
            1:require("./table/gui/one_gui_eye_table"),
            2:require("./table/gui/two_gui_eye_table"),
            3:require("./table/gui/three_gui_eye_table")
        }
    },
    checkFengCount:function(ay)
    {
        var counts = {};
        var f = null;
        var ret = [0,0];
        for(var i=0;i<ay.length;i++)
        {
            var f = ay[i];
            counts[f] = counts[f]?counts[f]+1:1;
        }
        for(var key in counts)
        {
            if(counts[key] == 1)
            {
                ret[0]+=2;
                ret[1]+=1;
            }
            else if(counts[key] == 2)
            {
                ret[0]+=1;
                ret[1]+=1;
            }
        }
        return ret;
    },
    getFZNCount:function(person)
    {
        var needLz = {
        };
        var jCount = 0;
        for(var i=3;i<5;i++)
        {
            var a = this.checkFengCount(person.Cards[i]);
            needLz[i] = a[0] ;
            jCount += a[1];
        }
        return [needLz,jCount];
    },
    getNeedBaoNumToZhengPu:function(guiKey)
    {
        var eyeCheck = this.CheckHelper["j"];
        var noeyeCheck = this.CheckHelper["nj"];


        var neyeNum = 999,eyeNum=999;
        for(var i=0;i<4;i++)
        {
            if(noeyeCheck[i].hasOwnProperty(guiKey))
            {
                neyeNum = i;
                break;
            }
        }
        for(var i=0;i<4;i++)
        {
            if(eyeCheck[i].hasOwnProperty(guiKey))
            {
                eyeNum = i;
                break;
            }
        }

        if(neyeNum == 999 && eyeNum == 999)
        {
            return null;
        }
        if(eyeNum > neyeNum)
        {
            return [neyeNum,0]
        }
        return [eyeNum+1,1]

    },
    check7d:function(person)
    {
        var hasCards = {};


        for(var key in person.Cards)
        {
            var ay = person.Cards[key];
            for(var i=0;i<ay.length;i++)
            {
                var f = ay[i];
                if(hasCards[f])
                {
                    hasCards[f]++;
                }
                else
                {
                    hasCards[f] = 1;
                }

            }
        }

        if(Object.keys(hasCards).length>7)
            return false;

        var fnums = {
            1:0,
            3:0
        };
        for(var key in hasCards)
        {
            var num = hasCards[key];
            if(fnums.hasOwnProperty(num))
            {
                fnums[num]++;
            }
        }

        var lastLai = person.m_BaoNum-(fnums[1]+fnums[3]);
        return   lastLai>-1? hasCards:null;

    },
    card2guiNum:function(ay)
    {
        var ret =[0,0,0,0,0,0,0,0,0];
        var card,from =-1;
        for(var i=0;i<ay.length;i++)
        {
            card = ay[i]%10;
            if(from == -1)
            {
                from = card-1;
            }
            ret[card-1]++;
        }
        if(from>0)
        {
            ret.splice(0,from);
            for(var i=0;i<from;i++)
            {
                ret.push(0);
            }
        }
        return ret.toString().replace(/,/g, '');
    },
    checkIsNorHu:function(person)
    {
        var needLz = {};
        var baoNum = person.m_BaoNum;
        var jCount = 0;
        for(var i=0;i<3;i++)
        {
            if(person.Cards[i].length>0)
            {
                this.card2guiNum(person.Cards[i]);
                var a = this.getNeedBaoNumToZhengPu(this.card2guiNum(person.Cards[i]));
                if(!a)
                {
                    return false;
                }
                needLz[i] = a[0] ;
                jCount += a[1];
            }
            else
            {
                needLz[i] = 0;
            }

        }
        var fCount = this.getFZNCount(person);
        needLz[3] = fCount[0][3];
        needLz[4] = fCount[0][4];
        var needBaoNum = needLz[0]+needLz[1]+needLz[2]+needLz[3]+needLz[4];
        jCount += fCount[1];
        if(needBaoNum<=baoNum )
        {

            return true;
        }

        return false;
    },
    isHu:function(person)
    {
        if(person.m_BaoNum == 4)
        {
            return true;
        }
        var is7d =  this.check7d(person);
        if(is7d)
        {
            return true;
        }
        return this.checkIsNorHu(person);
    }
}
module.exports = CMJGuiHelper;