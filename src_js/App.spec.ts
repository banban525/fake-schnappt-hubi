
import {createNewMap, Tile,Aisle} from './AppReducer';


describe('Test for App', function() {
    
    // beforeEach(function() {
    //   dispatch = sinon.spy();
    //   getState = sinon.spy();
    //   myAjax = sinon.spy();
  
    //   dispatcher = new IssueBrowserActionDispatcher(
    //     dispatch as (action:any)=>void, 
    //     getState as ()=>IIssueBrowserState, 
    //     myAjax as (url:string, callback:(data:any)=>void)=>void);
    // });
  
    it('createNewMap', function(){
        var map = createNewMap();
        map.Tiles.map((tile:Tile, index:number)=>{
            expect(index).toBe(tile.index);
        })
        map.Aisles.map((aisle:Aisle, index:number)=>{
            expect(index).toBe(aisle.index);
        })
        

    });
  
});