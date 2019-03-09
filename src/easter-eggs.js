/**
 * easter-eggs
 * Javascript activity indicator
 * @version v1.0.0 - 2019-03-06
 * @link https://github.com/ajsoriar/easter-eggs
 * @author Andres J. Soria R. <ajsoriar@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function(){
    
    window.EasterEggs = (function(){

        'use-strict';

        var PAINT_KEY = true,
            PAINT_HISTORY = true,
            keyCounter = 0,
            arrOfKeys = [],
            elKey = null,
            elHistory = null,
            MAX_MEMORY = 10,
            onKeyDownFunction = null;

        var sequences = [{
                id: "konamy-code",
                //sec: [38, 38, 40, 40, 37, 39, 37, 39, 'a', 'b'],
                sec: [38, 38, 40, 40, 37, 39, 37, 39, 65, 66],
                callback: function() { console.log( "Konamy Code!"); }
            },
            {
                id: "andres",
                sec: [65,74,83,82],
                callback: function() { console.log( "andres!"); }
            }
            //  Add more combinations here using EasterEggs.addSequence() function.
        ];

        var checkMatch = function() {
            //console.log("checkMatch()");

            var i,
                j,
                lon = sequences.length,
                lon2,
                match=false,
                matchCallback = function(){ console.log("?"); },
                okCont,
                p_arr_k,
                p_arr_sec;

            for (i = 0; i < lon; i++){
                lon2 = sequences[i].sec.length;
                okCont = 0;
                arrLen = arrOfKeys.length;
                if ( arrLen >= lon2){
                    for (j = 1; j <= lon2; j++ ){
                        p_arr_k = arrOfKeys[ arrLen - j ];
                        p_arr_sec = sequences[i].sec[ lon2 - j];
                        if ( p_arr_k === p_arr_sec ) {
                            okCont++;
                        }
                    }  
                }
                if (okCont === lon2) { // match was found
                    if( sequences[i].callback != null ) sequences[i].callback();
                    resetKeyDisplay();
                    return 1;
                }    
            }
            return 0;
        };

        var addKey = function( ev ) {
            if ( arrOfKeys.length <= MAX_MEMORY ){
                arrOfKeys.push( ev.keyCode );
            } else { // move all
                for (j = 0; j < MAX_MEMORY; j++ ){
                    arrOfKeys[j]=arrOfKeys[j+1];
                } 
                arrOfKeys[MAX_MEMORY] = ev.keyCode;
            }
            if ( PAINT_KEY) paintKey( ev );
            if ( PAINT_HISTORY ) paintHistory();
            //keyCounter++;
            var match = checkMatch(); // 0 or 1 is returned
            if (onKeyDownFunction != null) onKeyDownFunction(match);
        };

        var addSequence = function( id, arr, callback ) {
            if ( id === null) id = Date.now();
            if ( arr === null) arr = [];
            if ( callback === null) callback = function(){console.log("!!!");};
            sequences.push({
                id: id,
                sec: arr,
                callback: callback
            });
        };

        var paintKey = function( k ) {
            var str = '<div style="background-color: #F44336;width: 100px;height: 67px;border-radius: 7px;position: absolute;right: 0;bottom: 0;text-align: center; font-family: sans-serif; border: 1px solid saddlebrown;">'+
            '<div style="padding-top: 5px;color: white;font-weight: bold;font-size: 11px;">'+ k.code +'</div>'+
            '<div style="padding-top: 5px;color: white;font-weight: bold;font-size: 14px; color: #FFEB3B">'+ k.key +'</div>'+
            '<div style="padding-top: 5px;color: white;font-weight: bold;font-size: 14px; color: #CDDC39">'+ k.keyCode +'</div>'+
            '</div>';
            elKey.innerHTML = str; //k.code +" "+ k.key;
        };

        var paintHistory = function( k ) {
            var codes = '';
            for( var i=0; i< arrOfKeys.length; i++) { codes += arrOfKeys[i]+ ","; }
            var str = '<div style="background-color: #a9ef58;padding: 3px;border-radius: 7px;position: absolute;right: 0;bottom: 68px;text-align: center; font-family: sans-serif; border: 1px solid saddlebrown;">'+
            codes + '</div>';
            elHistory.innerHTML = str; 
        };

        var createKeyDomEl = function(){
            elKey = document.createElement('div');
            elKey.setAttribute("id", "ee-key");
            document.body.appendChild(elKey);
        };

        var createHistoryDomEl = function(){
            elHistory = document.createElement('div');
            elHistory.setAttribute("id", "ee-history");
            document.body.appendChild(elHistory);
        };

        var resetKeyDisplay = function() {
            paintKey({code:"-", key: "-", keyCode: "-"});
        };

        var init = function(){
            console.log('EasterEggs.init()');
            createKeyDomEl();
            createHistoryDomEl();
            resetKeyDisplay();
        };

        if(window.onload) {
            var currentOnLoad = window.onload;
            var newOnLoad = function(ev) {
                currentOnLoad(ev);
                init(ev);
            };
            window.onload = newOnLoad;
        } else {
            window.onload = init;
        }

        return {
            elKey: elKey,
            elHistory: elHistory,
            addKey: function( ev ) {
                addKey( ev );
            },
            reset: function() {
                sequences = [];
            },
            addSequence: function( id, arr, callback ){
                addSequence( id, arr, callback );
            },
            printList: function(){
                var i, lon = sequences.length, str = '';
                for (i = 0; i < lon; i++ ){
                    str = sequences[i].id +"; ["+ sequences[i].sec +"] "+ sequences[i].callback;
                    console.log(str);
                }
            },
            paintKey: function(val){
                if( val === 0 ) PAINT_KEY = false; else PAINT_KEY = true;
            },
            hide: function(){
            
            },
            show: function(){
            
            },
            onKeyDown: function(fn){
                onKeyDownFunction = fn;
            }
        };  

    })();

    window.addEventListener('keydown',function(e){
        window.EasterEggs.addKey(e);
    });
    //window.addEventListener('keydown',function(e){
    //    console.log("-!-");
    //});
    
}());

/*
    // Configuration example:

    EasterEggs.show();

    EasterEggs.addSequence(null,[49,50],function(){
        console.log("MATCH!!! 1,2");
    })
    
    // More options:
    
    EasterEggs.printList();
    
    EasterEggs.hide();
    
    EasterEggs.onKeyDown(function( match ){
        if ( match ) console.log("YES!"); else console.log("NO!");
    })
*/

