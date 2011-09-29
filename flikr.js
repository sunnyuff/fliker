var flickerLoad = function(){
    document.getElementById("hud").className = "hudShow";    
    var script = document.createElement('script');
    script.src = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=flickerGet";
    document.body.appendChild(script);
                           
}
          
var bar = {
        
    reset: function(){
        bar.max = 100;
        bar.initial = 0;
        bar.current = 0;
        bar.step = 0;
        bar.bar = null;
    },
    init: function(initial, max){
        bar.reset()
        
        bar.initial = initial;        
        bar.bar = document.getElementById('bar');
        document.getElementById('progress').style.setProperty('opacity', 1.0);
        //bar.bar.style.width = bar.max + 'px';
        bar.step = bar.max / max
        
        bar.bar.style.setProperty('-webkit-transform' , 'translate( '+ bar.max * (-1) +'% )');
        
    //console.log(bar.step * initial)
    },
    update : function(){
        bar.current += bar.step;
        //console.log((bar.max - bar.current));
        bar.bar.style.setProperty('-webkit-transform' , 'translate('+ (-1) * (bar.max - bar.current) +'% )');
        if((bar.max - bar.current) === 0){
            setTimeout(function(){
                document.getElementById('hud').className = '';   
                photos.reverse();
                drop()
            }, 500)
        }
    }
}
            
            
var photos = [];
            
//Photo class
function photo(){
                
    //Source of image
    this.src;
    //Title of image
    this.title;
    //Photo element
    this.element;
                
                
                
    this.create = function(url, title){
        this.title = title;
        this.url = url;
        this.render();
                    
    }                
                
    this.render = function(){
                    
                    
        var wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
                                             
        var title = document.createElement('div');
        title.className = 'title';               
        title.innerHTML = this.title;           
                                                           
        var image = document.createElement('img');
                    
        image.className = 'image';
                    
        image.onload = function(){
                        
            wrapper.style.width = image.width + 'px';
                        
            document.getElementById('playground').appendChild(wrapper);
                        
            bar.update();
            
            this.element = wrapper;
            photos.push(this.element);
            wrapper.id = photos.length;  
                    
        }
                    
        image.src = this.url;
                    
               
        wrapper.appendChild(title);
        wrapper.appendChild(image);                             
                    
                    
                    
    }
                
                
}
            
function flickerGet(data){    
    
    bar.init(0, data.items.length);
    
    //console.log(data);
    //window.data = data;
    var item;
    for(var i = 0; i < data.items.length ; i++){
        item = data.items[i];
        new photo().create(item.media.m, item.title)
    }
}
   


   
function drop(){
       
    if(photos.length){
        var photo = photos.pop();
        //console.log(photo.style)
        photo.className = photo.className + " final"
       
        setTimeout(function(){
            drop()
        }, 1000);
    }
    else{
        flickerLoad();
    }
}
   


window.onload = function(){
    
    
    flickerLoad();
}