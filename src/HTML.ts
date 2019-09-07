export class HTML implements iHTML {
  target:string;
  domString:string;
  rerenderProps: string[];
  rerenderEls: HTMLElement[];
constructor(target:string, domString: string, rerenderProps: string[]){
  this.target = target;
  this.domString = domString;
  this.rerenderProps = rerenderProps;
  this.render();
}
  render(){
    const el = document.createRange().createContextualFragment(this.domString);
    document.querySelector(this.target).appendChild(el);
    for (let prop of this.rerenderProps){
      this.rerenderEls.push(document.querySelector(prop));
    }
  }
  rerender(delta: number){
    for(let el of this.rerenderEls){
      el.innerHTML()
    }
  }
  on(target:string, eventType:string, cb:Function){
    
  }
  off(target:string, eventType:string){
    
  }
  addClass(target:string, className: string){
    
  }
  removeClass(target: string, className: string){
    
  }
}tHTML