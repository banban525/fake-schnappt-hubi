
import {createNewAisleStates,AisleState, Tile,Aisle,Player,PlayerType,AisleTypes,appReducer,OperationTypes, AppState,MessageId} from './AppReducer';


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
        var aisleStates = createNewAisleStates();
        aisleStates.map((aisle:AisleState, index:number)=>{
            expect(index).toBe(aisle.index);
        })
        
        var dicTemp : {[key:number]:number} = {}
        aisleStates.map((aisle:AisleState, index:number)=>{
            if(aisle.type in dicTemp === false)
            {
                dicTemp[aisle.type] = 0;
            }
            dicTemp[aisle.type]++;
        });
        expect(dicTemp[AisleTypes.FreePassage]).toBe(14);
        expect(dicTemp[AisleTypes.MagicDoor1]).toBe(1);
        expect(dicTemp[AisleTypes.MagicDoor2]).toBe(1);
        expect(dicTemp[AisleTypes.MouseHole]).toBe(3);
        expect(dicTemp[AisleTypes.RabbitWindow]).toBe(3);
        expect(dicTemp[AisleTypes.Wall]).toBe(2);
    });

    it('which aisle rabbit can pass', ()=>{
        var rabbit = new Player(PlayerType.BlueRabbit)
        expect(rabbit.canPass(new AisleState(0,AisleTypes.FreePassage))).toBeTruthy();
        expect(rabbit.canPass(new AisleState(0,AisleTypes.MagicDoor1))).toBeFalsy();
        expect(rabbit.canPass(new AisleState(0,AisleTypes.MagicDoor2))).toBeFalsy();
        expect(rabbit.canPass(new AisleState(0,AisleTypes.MagicDoor3))).toBeFalsy();
        expect(rabbit.canPass(new AisleState(0,AisleTypes.MagicDoorOpened))).toBeTruthy();
        expect(rabbit.canPass(new AisleState(0,AisleTypes.MouseHole))).toBeFalsy();
        expect(rabbit.canPass(new AisleState(0,AisleTypes.RabbitWindow))).toBeTruthy();
        expect(rabbit.canPass(new AisleState(0,AisleTypes.Wall))).toBeFalsy();
    });
  
    it('which aisle mouse can pass', ()=>{
        var rabbit = new Player(PlayerType.RedMouse)
        expect(rabbit.canPass(new AisleState(0,AisleTypes.FreePassage))).toBeTruthy();
        expect(rabbit.canPass(new AisleState(0,AisleTypes.MagicDoor1))).toBeFalsy();
        expect(rabbit.canPass(new AisleState(0,AisleTypes.MagicDoor2))).toBeFalsy();
        expect(rabbit.canPass(new AisleState(0,AisleTypes.MagicDoor3))).toBeFalsy();
        expect(rabbit.canPass(new AisleState(0,AisleTypes.MagicDoorOpened))).toBeTruthy();
        expect(rabbit.canPass(new AisleState(0,AisleTypes.MouseHole))).toBeTruthy();
        expect(rabbit.canPass(new AisleState(0,AisleTypes.RabbitWindow))).toBeFalsy();
        expect(rabbit.canPass(new AisleState(0,AisleTypes.Wall))).toBeFalsy();
    });
  
    it('hidden aisle is shown at moving',()=>{

        var state = appReducer();
        state.aisleStates[0].type = AisleTypes.FreePassage;
        state.aisleStates[0].shown = false;
        state.players[0].position = 0;
        var currentPlayer = state.players[0];
        
        var newState = appReducer(state, {type:'onMoveRight'});

        expect(newState.aisleStates[0].shown).toBeTruthy();
        expect(newState.players[3].playerType).toBe(currentPlayer.playerType);
        expect(newState.players[3].position).toBe(1);
        expect(newState.operations[0].aisle).toBe(0);
        expect(newState.operations[0].position).toBe(1);
        expect(newState.operations[0].type).toBe(OperationTypes.Move);
        expect(newState.operations[0].player).toBe(currentPlayer.playerType);

        expect(newState.players[newState.players.length-1].canPass).not.toBeUndefined();
        expect(newState.aisleStates[0].isClosedMagicDoor).not.toBeUndefined();
    });

    it('hidden aisle is shown but not move', ()=>{

        var state = appReducer();
        state.aisleStates[0].type = AisleTypes.MouseHole;
        state.aisleStates[0].shown = false;
        state.players[0].position = 0;
        var currentPlayer = state.players[0];
        
        var newState = appReducer(state, {type:'onMoveRight'});

        expect(newState.aisleStates[0].shown).toBeTruthy();
        expect(newState.players[0].playerType).not.toBe(currentPlayer.playerType);
        expect(newState.operations[0].aisle).toBe(0);
        expect(newState.operations[0].position).toBe(0);
        expect(newState.operations[0].type).toBe(OperationTypes.NoMove);
        expect(newState.operations[0].player).toBe(currentPlayer.playerType);
    });

    it('player can move twice, if player move shown aisle.', ()=>{
        var state = appReducer();
        state.aisleStates[0].type = AisleTypes.RabbitWindow;
        state.aisleStates[0].shown = true;
        state.players[0].position = 0;
        var currentPlayer = state.players[0];
        
        var state = appReducer(state, {type:'onMoveRight'});

        expect(state.players[0].playerType).toBe(currentPlayer.playerType);
        expect(state.operations[0].aisle).toBe(0);
        expect(state.operations[0].position).toBe(1);
        expect(state.operations[0].type).toBe(OperationTypes.QuickMove);
        expect(state.operations[0].player).toBe(currentPlayer.playerType);


        state = appReducer(state, {type:'onMoveLeft'});
        expect(state.players[0].playerType).not.toBe(currentPlayer.playerType);
        
    });

    it('can not open magic door, when there is one player ', ()=>{
        var state = appReducer();
        state.aisleStates[0].type = AisleTypes.MagicDoor1;
        state.aisleStates[0].shown = true;
        state.players[0].position = 0;
        var currentPlayer = state.players[0];
        
        var newState = appReducer(state, {type:'onMoveRight'});

        expect(newState.players[0].playerType).not.toBe(currentPlayer.playerType);
        expect(newState.aisleStates[0].type).not.toBe(AisleTypes.MagicDoorOpened);
        expect(newState.operations.length).toBe(0);
    })

    it('open magic door, when ther are two players', ()=>{
        var state = appReducer();
        state.aisleStates[0].type = AisleTypes.MagicDoor1;
        state.aisleStates[0].shown = false;
        state.players[0].position = 0;
        state.players[1].position = 1;
        var currentPlayer = state.players[0];
        
        var newState = appReducer(state, {type:'onMoveRight'});
        
        expect(newState.players[3].playerType).toBe(currentPlayer.playerType);
        expect(newState.aisleStates[0].type).toBe(AisleTypes.MagicDoorOpened);
        expect(newState.operations[0].aisle).toBe(0);
        expect(newState.operations[0].position).toBe(1);
        expect(newState.operations[0].type).toBe(OperationTypes.Move);
        expect(newState.operations[0].player).toBe(currentPlayer.playerType);

    })

    it('Hubi appears', ()=>{
        var state = appReducer();
        state.aisleStates.forEach(_=>_.type = AisleTypes.FreePassage);
        state.aisleStates.forEach(_=>_.shown = true);
        state.aisleStates[0].type = AisleTypes.MagicDoor2;
        state.aisleStates[1].type = AisleTypes.MagicDoorOpened;
        state.players[0].position = 0;
        state.players[1].position = 1;

        expect(state.hubiPosition).toBe(-1);
        
        state = appReducer(state, {type:'onMoveRight'});
        
        expect(state.hubiPosition).not.toBe(-1);
        expect(state.operations[state.operations.length-1].type).toBe(OperationTypes.ShownHubi)
    });

    it('move hubi', ()=>{
        var state = appReducer();
        state.aisleStates.forEach(_=>_.type = AisleTypes.FreePassage);
        state.aisleStates.forEach(_=>_.shown = true);
        state.aisleStates[0].type = AisleTypes.MagicDoor2;
        state.aisleStates[1].type = AisleTypes.MagicDoorOpened;
        state.players[0].position = 0;
        state.players[1].position = 1;
        
        state = appReducer(state, {type:'onMoveRight'});
        
        state.hubiMoveTiming = [2,1,1,1,1];
        var lastHubiPosition = state.hubiPosition;

        state = appReducer(state, {type:'onMoveLeft'});
        expect(state.hubiPosition).toBe(lastHubiPosition);
        state = appReducer(state, {type:'onMoveRight'});
        expect(state.hubiPosition).not.toBe(lastHubiPosition);
    });

    it('hubi do not move if no movable tiles.', ()=>{
        var state = appReducer();
        state.aisleStates.forEach(_=>_.type = AisleTypes.FreePassage);
        state.aisleStates.forEach(_=>_.shown = true);
        state.aisleStates[0].type = AisleTypes.MagicDoor2;
        state.aisleStates[1].type = AisleTypes.MagicDoorOpened;
        state.players[0].position = 0;
        state.players[1].position = 1;
        
        state = appReducer(state, {type:'onMoveRight'});
        state.hubiPosition = 0;
        state.hubiMoveTiming = [1,1,1,1,1];
        state.players[1].position = 1;
        state.players[2].position = 4;
        state.players[3].position = 5;

        state = appReducer(state, {type:'onMoveRight'});
        expect(state.hubiPosition).toBe(0);
    })

    it('snap hubi with 1 player', ()=>{
        var state = appReducer();
        state.aisleStates.forEach(_=>_.type = AisleTypes.FreePassage);
        state.aisleStates.forEach(_=>_.shown = true);
        state.aisleStates[0].type = AisleTypes.MagicDoor2;
        state.aisleStates[1].type = AisleTypes.MagicDoorOpened;
        state.players[0].position = 0;
        state.players[1].position = 1;
        
        state = appReducer(state, {type:'onMoveRight'});
        state.hubiPosition = 0;

        state = appReducer(state, {type:'onMoveLeft'});
        var lastMessages = state.messages[state.messages.length-1];
        expect(lastMessages.messageId).toBe(MessageId.FindHubi);

    });

    it('snap hubi with 2 player', ()=>{
        var state = appReducer();
        state.aisleStates.forEach(_=>_.type = AisleTypes.FreePassage);
        state.aisleStates.forEach(_=>_.shown = true);
        state.aisleStates[0].type = AisleTypes.MagicDoor2;
        state.aisleStates[1].type = AisleTypes.MagicDoorOpened;
        state.players[0].position = 0;
        state.players[1].position = 1;
        
        state = appReducer(state, {type:'onMoveRight'});
        state.hubiPosition = 0;
        state.players[1].position = 0;

        state = appReducer(state, {type:'onMoveLeft'});
        var lastMessages = state.messages[state.messages.length-1];
        expect(lastMessages.messageId).toBe(MessageId.Congratulations);
    });
});