import * as objectAssign from 'object-assign';
import * as immutable from 'immutable';

export interface AppState
{
    map: Map;
    operations: Operation[];
    players: Player[];
    tileStates:TileState[];
    aisleStates:AisleState[];
    messages:Message[];
    remainsCount:number;
    phase:GamePhase;
    hubiPosition:number;
}

export enum GamePhase
{
    Introduction,
    SearchMagicDoor,
    SearchHubi,
    Ending,
}

export class Map
{
    Aisles: Aisle[];
    Tiles: Tile[];
}

export enum AisleTypes
{
    FreePassage = 0x00,
    MouseHole = 0x01,
    RabbitWindow = 0x02,
    Wall = 0x03,
    MagicDoor1 = 0x04,
    MagicDoor2 = 0x05,
    MagicDoor3 = 0x06,
    MagicDoorOpened = 0x07,
    Hidden = 0x0000,
    Shown  = 0x1000,
}

var DifficultyNormal = [
    AisleTypes.FreePassage,
    AisleTypes.FreePassage,
    AisleTypes.FreePassage,
    AisleTypes.FreePassage,
    AisleTypes.FreePassage,
    AisleTypes.FreePassage,
    AisleTypes.FreePassage,
    AisleTypes.FreePassage,
    AisleTypes.FreePassage,
    AisleTypes.FreePassage,
    AisleTypes.FreePassage,
    AisleTypes.FreePassage,
    AisleTypes.FreePassage,
    AisleTypes.FreePassage,
    AisleTypes.MouseHole,
    AisleTypes.MouseHole,
    AisleTypes.MouseHole,
    AisleTypes.RabbitWindow,
    AisleTypes.RabbitWindow,
    AisleTypes.RabbitWindow,
    AisleTypes.Wall,
    AisleTypes.Wall,
    AisleTypes.MagicDoor1,
    AisleTypes.MagicDoor2,
]

export enum TileTypes
{
    WhiteOwl = 0x00,
    WhiteCentipede = 0x01,
    WhiteToad = 0x02,
    WhiteBat = 0x03,
    BlackOwl = 0x10,
    BlackCentipede = 0x11,
    BlackToad = 0x12,
    BlackBat = 0x13,
}

export enum PlayerType
{
    GreenRabbit = 0x00,
    BlueRabbit = 0x01,
    RedMouse = 0x02,
    YellowMouse = 0x03,
    None = 0xFF
}

export interface Aisle
{
    index:number;
    tiles:NextTo;
}

export class AisleState
{
    constructor(index:number, type:AisleTypes)
    {
        this.index = index;
        this.type = type;
        this.shown = false;
    }
    index:number;
    type:AisleTypes;
    shown:boolean;

    isClosedMagicDoor():boolean
    {
        return this.type === AisleTypes.MagicDoor1 ||
            this.type === AisleTypes.MagicDoor2 ||
            this.type === AisleTypes.MagicDoor3;
    }

    isMagicDoor():boolean
    {
        return this.type === AisleTypes.MagicDoor1 ||
            this.type === AisleTypes.MagicDoor2 ||
            this.type === AisleTypes.MagicDoor3 ||
            this.type === AisleTypes.MagicDoorOpened;
    }

    changeType(type:AisleTypes):AisleState
    {
        var result = new AisleState(this.index,type);
        result.shown = this.shown;
        return result;
    }
    changeShown(shown:boolean):AisleState
    {
        var result = new AisleState(this.index, this.type);
        result.shown = shown;
        return result;
    }
}


export class Tile
{
    index: number;
    type: TileTypes;
    aisles : NextTo;

    constructor(index:number, type:TileTypes, aisles:NextTo)
    {
        this.index = index;
        this.type = type;
        this.aisles = aisles;
    }

    IsBlackTile():boolean
    {
        if (this.type === TileTypes.BlackBat ||
            this.type === TileTypes.BlackCentipede ||
            this.type === TileTypes.BlackOwl ||
            this.type === TileTypes.BlackToad)
        {
            return true;
        }
        return false;
    }

    IsWhiteTile():boolean
    {
        return this.IsBlackTile()===false;
    }
}

export class TileState
{
    index: number;
    hadHintDoorHint: boolean;
    hadHintFubi: boolean;
}

export enum OperationTypes
{
    Move,
    QuickMove,
    Hint,
    NoMove
}

export interface Operation
{
    type: OperationTypes,
    position: number,
    aisle: number,
    player: PlayerType
}

export interface NextTo
{
    up:number;
    down:number;
    left:number;
    right:number;
}

export interface Message
{
    id:number;
    icon:MessageIcons;
    text:string;
}
export enum MessageIcons
{
    WhiteOwl = 0x00,
    WhiteCentipede = 0x01,
    WhiteToad = 0x02,
    WhiteBat = 0x03,
    BlackOwl = 0x10,
    BlackCentipede = 0x11,
    BlackToad = 0x12,
    BlackBat = 0x13,
    GameMaster = 0x20,
    Fubi = 0x21,
}

const constMap:Map = createMap();

export function createMap() : Map
{
    var result: Map = {
        Aisles:[],
        Tiles:[]
    };
    result.Tiles = Array.apply(null, {length:16}).map((value:any, index:number)=>{});
    result.Aisles = Array.apply(null, {length:24}).map((value:any, index:number)=>{});


    var tempMap : string[][] = [
        ["T-1","A-1","T-1","A-1","T-1","A-1","T-1","A-1","T-1"],
        ["A-1", "T0", "A0", "T1", "A1", "T2", "A2", "T3","A-1"],
        ["T-1","A12","T-1","A13","T-1","A14","T-1","A15","T-1"],
        ["A-1", "T4", "A3", "T5", "A4", "T6", "A5", "T7","A-1"],
        ["T-1","A16","T-1","A17","T-1","A18","T-1","A19","T-1"],
        ["A-1", "T8", "A6", "T9", "A7","T10", "A8","T11","A-1"],
        ["T-1","A20","T-1","A21","T-1","A22","T-1","A23","T-1"],
        ["A-1","T12", "A9","T13","A10","T14","A11","T15","A-1"],
        ["T-1","A-1","T-1","A-1","T-1","A-1","T-1","A-1","T-1"],
    ]
    var tempTileType : TileTypes[][] = [
        [TileTypes.WhiteOwl,       TileTypes.BlackCentipede, TileTypes.WhiteToad,      TileTypes.BlackOwl],
        [TileTypes.BlackToad,      TileTypes.WhiteBat,       TileTypes.BlackBat,       TileTypes.WhiteCentipede],
        [TileTypes.WhiteCentipede, TileTypes.BlackBat,       TileTypes.WhiteBat,       TileTypes.BlackToad],
        [TileTypes.BlackOwl,       TileTypes.WhiteToad,      TileTypes.BlackCentipede, TileTypes.WhiteOwl],
    ]
    
    for(var $y = 0; $y < 4; $y++)
    {
        for(var $x = 0; $x < 4; $x++)
        {
            var $tileX = $x * 2 + 1;
            var $tileY = $y * 2 + 1;
            var tileNoText = tempMap[$tileY][$tileX].replace("T", "");
            var tileNo  = parseInt(tileNoText);
            var tileType = tempTileType[$y][$x];
            var upAisleNo    = parseInt(tempMap[$tileY - 1][$tileX + 0].replace("A",""))
            var downAisleNo  = parseInt(tempMap[$tileY + 1][$tileX + 0].replace("A",""))
            var leftAisleNo  = parseInt(tempMap[$tileY + 0][$tileX - 1].replace("A",""))
            var rightAisleNo = parseInt(tempMap[$tileY + 0][$tileX + 1].replace("A",""))

            result.Tiles[tileNo]= new Tile(tileNo,tileType,
                {
                    up : upAisleNo,
                    down : downAisleNo,
                    left : leftAisleNo,
                    right : rightAisleNo
                }
            );
        }
    }
    for(var $y = 0; $y < 4; $y++)
    {
        for(var $x = 0; $x < 3; $x++)
        {
            var $aisleX = $x * 2 + 2;
            var $aisleY = $y * 2 + 1;
            var aisleNoText = tempMap[$aisleY][$aisleX].replace("A", "");
            var aisleNo  = parseInt(aisleNoText);
            var upTile    = parseInt(tempMap[$aisleY - 1][$aisleX + 0].replace("T",""))
            var downTile  = parseInt(tempMap[$aisleY + 1][$aisleX + 0].replace("T",""))
            var leftTile  = parseInt(tempMap[$aisleY + 0][$aisleX - 1].replace("T",""))
            var rightTile = parseInt(tempMap[$aisleY + 0][$aisleX + 1].replace("T",""))
            result.Aisles[aisleNo] = {
                index : aisleNo,
                tiles : {
                    up : upTile,
                    down: downTile,
                    left : leftTile,
                    right : rightTile
                }
            };
        }
    }
    for(var $y = 0; $y < 3; $y++)
    {
        for(var $x = 0; $x < 4; $x++)
        {
            var $aisleX = $x * 2 + 1;
            var $aisleY = $y * 2 + 2;
            var aisleNoText = tempMap[$aisleY][$aisleX].replace("A", "");
            var aisleNo  = parseInt(aisleNoText);
            var upTile    = parseInt(tempMap[$aisleY - 1][$aisleX + 0].replace("T",""))
            var downTile  = parseInt(tempMap[$aisleY + 1][$aisleX + 0].replace("T",""))
            var leftTile  = parseInt(tempMap[$aisleY + 0][$aisleX - 1].replace("T",""))
            var rightTile = parseInt(tempMap[$aisleY + 0][$aisleX + 1].replace("T",""))
            result.Aisles[aisleNo] = {
                index : aisleNo,
                tiles : {
                    up : upTile,
                    down: downTile,
                    left : leftTile,
                    right : rightTile
                }
            };
        }
    }
    return result;
}

export function createNewAisleStates():AisleState[]
{
    var results = Array.apply(null, {length:24}).map((value:any, index:number)=>new AisleState(index, AisleTypes.FreePassage));
    
    do{
        var aisleTypes = DifficultyNormal.slice(0, DifficultyNormal.length);
        for(var index = 0; index < results.length; index++)
        {
            var aisle = results[index];

            var selectedIndex = Math.floor(Math.random() * aisleTypes.length);
            var selectedAisle = aisleTypes[selectedIndex]
            aisleTypes.splice(selectedIndex, 1);
            aisle.type = selectedAisle;
        }
    }while(IsValidMap(results) === false);
    return results;
}

function IsValidMap(aisleStates:AisleState[]) : boolean
{
    var reachableTiles:number[] = [];
    getReachable(aisleStates, constMap.Tiles[0], new Player(PlayerType.GreenRabbit), reachableTiles);
    if(reachableTiles.length !== 16)
    {
        return false;
    }

    reachableTiles = [];
    getReachable(aisleStates, constMap.Tiles[0], new Player(PlayerType.BlueRabbit), reachableTiles);
    if(reachableTiles.length !== 16)
    {
        return false;
    }

    reachableTiles = [];
    getReachable(aisleStates, constMap.Tiles[0], new Player(PlayerType.RedMouse), reachableTiles);
    if(reachableTiles.length !== 16)
    {
        return false;
    }

    reachableTiles = [];
    getReachable(aisleStates, constMap.Tiles[0], new Player(PlayerType.YellowMouse), reachableTiles);
    if(reachableTiles.length !== 16)
    {
        return false;
    }


    return true;
}

export class Player
{
    constructor(playerType:PlayerType, position:number = 0)
    {
        this.playerType = playerType;
        this.position = position;
    }
    playerType: PlayerType;
    position: number;

    canPass(aisle: AisleState) : boolean
    {
        if(aisle.type === AisleTypes.Wall ||
            aisle.type === AisleTypes.MagicDoor1 ||
            aisle.type === AisleTypes.MagicDoor2 ||
            aisle.type === AisleTypes.MagicDoor3)
        {
            return false;
        }
        if(this.playerType === PlayerType.BlueRabbit || 
            this.playerType === PlayerType.GreenRabbit)
        {
            if(aisle.type === AisleTypes.MouseHole)
            {
                return false;
            }
        }
        
        if(this.playerType === PlayerType.RedMouse || 
            this.playerType === PlayerType.YellowMouse)
        {
            if(aisle.type === AisleTypes.RabbitWindow)
            {
                return false;
            }
        }
        
        return true;
    }

    createNewPlayer(position:number):Player
    {
        return new Player(this.playerType, position);
    }
}


function getReachable(aisleStates:AisleState[], startTile:Tile, player:Player, reachableTiles: number[]) : void
{
    if(reachableTiles.indexOf(startTile.index) != -1)
    {
        return;
    }
    reachableTiles.push(startTile.index);
    
    var tile = startTile;

    if(tile.aisles.up != -1)
    {
        if(player.canPass(aisleStates[tile.aisles.up]))
        {
            var nextTile = constMap.Tiles[constMap.Aisles[tile.aisles.up].tiles.up];
            if(reachableTiles.indexOf(nextTile.index) === -1)
            {
                getReachable(aisleStates, nextTile, player, reachableTiles);
            }
        }
    }
    if(tile.aisles.down != -1)
    {
        if(player.canPass(aisleStates[tile.aisles.down]))
        {
            var nextTile = constMap.Tiles[constMap.Aisles[tile.aisles.down].tiles.down];
            if(reachableTiles.indexOf(nextTile.index) === -1)
            {
                getReachable(aisleStates, nextTile, player, reachableTiles);
            }
        }
    }
    if(tile.aisles.left != -1)
    {
        if(player.canPass(aisleStates[tile.aisles.left]))
        {
            var nextTile = constMap.Tiles[constMap.Aisles[tile.aisles.left].tiles.left];
            if(reachableTiles.indexOf(nextTile.index) === -1)
            {
                getReachable(aisleStates, nextTile, player, reachableTiles);
            }
        }
    }
    if(tile.aisles.right != -1)
    {
        if(player.canPass(aisleStates[tile.aisles.right]))
        {
            var nextTile = constMap.Tiles[constMap.Aisles[tile.aisles.right].tiles.right];
            if(reachableTiles.indexOf(nextTile.index) === -1)
            {
                getReachable(aisleStates, nextTile, player, reachableTiles);
            }
        }
    }
}

function createNewTileStates():TileState[]
{
    return Array.apply(null, {length:16}).map((value:any, index:number)=>{
        return {hadHintDoorHint:false,hadHintFubi:false,index:index}});
}

var initialAppState:AppState =
{
    map:constMap,
    operations:[],
    players:[
        new Player(PlayerType.GreenRabbit),
        new Player(PlayerType.RedMouse),
        new Player(PlayerType.BlueRabbit),
        new Player(PlayerType.YellowMouse)
    ],
    aisleStates:createNewAisleStates(),
    tileStates:createNewTileStates(),
    messages:[],
    remainsCount:20,
    phase:GamePhase.SearchMagicDoor,
    hubiPosition:-1
};
initialAppState.players[0].position = 0;
initialAppState.players[1].position = 3;
initialAppState.players[2].position = 12;
initialAppState.players[3].position = 15;

export class AppActionDispatcher
{
  dispatch: (action:any)=>any;
  getState: ()=>AppState;
  constructor(dispatch:(action:any)=>any, getState: ()=>AppState)
  {
    this.dispatch = dispatch;
    this.getState = getState;
  }
  onMoveUp():any{
    this.dispatch({type:"onMoveUp"});
  }
  onMoveDown():any{
    this.dispatch({type:"onMoveDown"});
  }
  onMoveLeft():any{
    this.dispatch({type:"onMoveLeft"});
  }
  onMoveRight():any{
    this.dispatch({type:"onMoveRight"});
  }
  onListenHint():any{
    this.dispatch({type:"onListenHint"});
  }
  onTest():any{
    this.dispatch({type:"onTest"});
  }
}

export function appReducer(state: AppState = initialAppState, action: any = {type:'none'}):AppState
{
    var currentPlayer = state.players[0];
    var newMessages = state.messages;

    switch(action.type)
    {
        case 'onMoveUp':
            var nextAisleNo = state.map.Tiles[currentPlayer.position].aisles.up;
            var nextTileNo = state.map.Aisles[nextAisleNo].tiles.up;
            return onMove(state, nextAisleNo, nextTileNo, Direction.up);
        case 'onMoveDown':
            var nextAisleNo = state.map.Tiles[currentPlayer.position].aisles.down;
            var nextTileNo = state.map.Aisles[nextAisleNo].tiles.down;
            return onMove(state, nextAisleNo, nextTileNo, Direction.down);
        case 'onMoveLeft':
            var nextAisleNo = state.map.Tiles[currentPlayer.position].aisles.left;
            var nextTileNo = state.map.Aisles[nextAisleNo].tiles.left;
            return onMove(state, nextAisleNo, nextTileNo, Direction.left);
        case 'onMoveRight':
            var nextAisleNo = state.map.Tiles[currentPlayer.position].aisles.right;
            var nextTileNo = state.map.Aisles[nextAisleNo].tiles.right;
            return onMove(state, nextAisleNo, nextTileNo, Direction.right);
        case 'onListenHint':
            return onListenHint(state);
        case 'onTest':
            return onTest(state);
    }
    return state;    
}

function onTest(state:AppState):AppState
{
    playSound(audioBuffer);
    return state;
}


function onListenHint(state:AppState):AppState
{
    if(state.phase === GamePhase.SearchMagicDoor)
    {
        return onListenAisleHint(state);
    }
    if(state.phase === GamePhase.SearchHubi)
    {
        return onListenHubiHint(state);
    }
}

function onListenHubiHint(state:AppState):AppState
{
    var newMessages = state.messages;
    var currentPlayer = state.players[0];

    var hubiTileType = state.map.Tiles[state.hubiPosition].type;

    var hintMessageId = getHubiHintMessage(hubiTileType);
    
    // メッセージ
    newMessages = newMessages.concat({
        id:newMessages.length, 
        icon:MessageIcons.GameMaster,
        text:getMessage(hintMessageId)});


    //現在の位置のまま
    var newPlayer = currentPlayer;
    var newPlayers = state.players.slice(1).concat(newPlayer);

    // 操作を記録
    var newOperations = state.operations.concat([{
        aisle:-1, 
        player:currentPlayer.playerType, 
        type:OperationTypes.Hint, 
        position:newPlayer.position}]);

    return objectAssign({}, state, {players:newPlayers, operations:newOperations, messages:newMessages});
}

function getHubiHintMessage(hubiTileType:TileTypes):MessageId
{
    var messageMap = [
        {tile:TileTypes.BlackBat,       messages:[MessageId.HubiIsInBatTile,       MessageId.HubiIsInBlackBatTile]},
        {tile:TileTypes.BlackCentipede, messages:[MessageId.HubiIsInCentipedeTile, MessageId.HubiIsInBlackCentipedeTile]},
        {tile:TileTypes.BlackOwl,       messages:[MessageId.HubiIsInOwlTile,       MessageId.HubiIsInBlackOwlTile]},
        {tile:TileTypes.BlackToad,      messages:[MessageId.HubiIsInToadTile,      MessageId.HubiIsInBlackToadTile]},
        {tile:TileTypes.WhiteBat,       messages:[MessageId.HubiIsInBatTile,       MessageId.HubiIsInWhiteBatTile]},
        {tile:TileTypes.WhiteCentipede, messages:[MessageId.HubiIsInCentipedeTile, MessageId.HubiIsInWhiteCentipedeTile]},
        {tile:TileTypes.WhiteOwl,       messages:[MessageId.HubiIsInOwlTile,       MessageId.HubiIsInWhiteOwlTile]},
        {tile:TileTypes.WhiteToad,      messages:[MessageId.HubiIsInToadTile,      MessageId.HubiIsInWhiteToadTile]},
    ]

    var messageDetailLevel = 1; //TODO 難易度と乱数で決める

    var matchedMessage = messageMap.filter(_=>_.tile === hubiTileType)[0];
    return matchedMessage.messages[messageDetailLevel];
}

function onListenAisleHint(state:AppState):AppState
{
    var hideAndClosedMagicDoors = state.aisleStates.filter(_=>_.shown === false && _.isClosedMagicDoor());
    if(hideAndClosedMagicDoors.length === 0)
    {
        // 教えられることはない
        return state;
    }

    var sortedDoors = hideAndClosedMagicDoors.sort((x,y)=>x.type - y.type);
    var mapMagicDoorAisle = state.map.Aisles[sortedDoors[0].index];
    if(mapMagicDoorAisle.tiles.up !== -1)
    {
        // 上下方向の通路
        var tiles = [
            state.map.Tiles[mapMagicDoorAisle.tiles.up],
            state.map.Tiles[mapMagicDoorAisle.tiles.down],
        ];
    }
    else
    {
        // 左右方向の通路
        var tiles = [
            state.map.Tiles[mapMagicDoorAisle.tiles.left],
            state.map.Tiles[mapMagicDoorAisle.tiles.right],
        ];
    }
    var newMessages = state.messages;
    var currentPlayer = state.players[0];
    
    var hintMessageId = getMagicDoorHintMessage(tiles);

    // メッセージ
    newMessages = newMessages.concat({
        id:newMessages.length, 
        icon:MessageIcons.GameMaster,
        text:getMessage(hintMessageId)});


    //現在の位置のまま
    var newPlayer = currentPlayer;
    var newPlayers = state.players.slice(1).concat(newPlayer);

    // 操作を記録
    var newOperations = state.operations.concat([{
        aisle:-1, 
        player:currentPlayer.playerType, 
        type:OperationTypes.Hint, 
        position:newPlayer.position}]);

    return objectAssign({}, state, {players:newPlayers, operations:newOperations, messages:newMessages});
}

function getMagicDoorHintMessage(tiles:Tile[]):MessageId
{
    var messageMap = [
        {tiles:[TileTypes.BlackBat,       TileTypes.WhiteBat],      messages:[MessageId.MagicDoorIsBitweenBatAndBat,       MessageId.MagicDoorIsBitweenBlackBatAndWhiteBat]},
        {tiles:[TileTypes.BlackBat,       TileTypes.WhiteToad],     messages:[MessageId.MagicDoorIsBitweenBatAndToad,      MessageId.MagicDoorIsBitweenBlackBatAndWhiteToad]},
        {tiles:[TileTypes.BlackBat,       TileTypes.WhiteCentipede],messages:[MessageId.MagicDoorIsBitweenBatAndCentipede, MessageId.MagicDoorIsBitweenBlackBatAndWhiteCentipede]},
        {tiles:[TileTypes.BlackCentipede, TileTypes.WhiteOwl],      messages:[MessageId.MagicDoorIsBitweenCentipedeAndOwl, MessageId.MagicDoorIsBitweenBlackCentipedeAndWhiteOwl]},
        {tiles:[TileTypes.BlackCentipede, TileTypes.WhiteToad],     messages:[MessageId.MagicDoorIsBitweenCentipedeAndToad,MessageId.MagicDoorIsBitweenBlackCentipedeAndWhiteToad]},
        {tiles:[TileTypes.BlackCentipede, TileTypes.WhiteBat],      messages:[MessageId.MagicDoorIsBitweenBatAndCentipede, MessageId.MagicDoorIsBitweenBlackCentipedeAndWhiteBat]},
        {tiles:[TileTypes.BlackOwl,       TileTypes.WhiteToad],     messages:[MessageId.MagicDoorIsBitweenOwlAndToad,      MessageId.MagicDoorIsBitweenBlackOwlAndWhiteToad]},
        {tiles:[TileTypes.BlackOwl,       TileTypes.WhiteCentipede],messages:[MessageId.MagicDoorIsBitweenCentipedeAndOwl, MessageId.MagicDoorIsBitweenBlackOwlAndWhiteCentipede]},
        {tiles:[TileTypes.BlackToad,      TileTypes.WhiteOwl],      messages:[MessageId.MagicDoorIsBitweenOwlAndToad,      MessageId.MagicDoorIsBitweenBlackToadAndWhiteOwl]},
        {tiles:[TileTypes.BlackToad,      TileTypes.WhiteCentipede],messages:[MessageId.MagicDoorIsBitweenCentipedeAndToad,MessageId.MagicDoorIsBitweenBlackToadAndWhiteCentipede]},
        {tiles:[TileTypes.BlackToad,      TileTypes.WhiteBat],      messages:[MessageId.MagicDoorIsBitweenBatAndToad,      MessageId.MagicDoorIsBitweenBlackToadAndWhiteBat]},
    ];

    var messageDetailLevel = 1; //TODO 難易度と乱数で決める
    var blackTile = tiles.filter(_=>_.IsBlackTile())[0];
    var whiteTile = tiles.filter(_=>_.IsWhiteTile())[0];

    var matchedMessage = messageMap.filter(_=>_.tiles[0] === blackTile.type && _.tiles[1] === whiteTile.type)[0];
    return matchedMessage.messages[messageDetailLevel];
}

enum Direction
{
    up,
    down,
    left,
    right
}

enum MessageId
{
    Moved,
    MovedShownAisle,
    OpendMagicDoor,
    AisleIsFreePassage,
    AisleIsRabbitWindow_Moved,
    AisleIsRabbitWindow_NoMoved,
    AisleIsMouseHole_Moved,
    AisleIsMouseHole_NoMoved,
    AisleIsWall,
    AisleIsMagicDoor,
    CannotMove,
    MagicDoorIsBitweenBlackBatAndWhiteBat,
    MagicDoorIsBitweenBlackBatAndWhiteToad,
    MagicDoorIsBitweenBlackBatAndWhiteCentipede,
    MagicDoorIsBitweenBlackCentipedeAndWhiteOwl,
    MagicDoorIsBitweenBlackCentipedeAndWhiteToad,
    MagicDoorIsBitweenBlackCentipedeAndWhiteBat,
    MagicDoorIsBitweenBlackOwlAndWhiteToad,
    MagicDoorIsBitweenBlackOwlAndWhiteCentipede,
    MagicDoorIsBitweenBlackToadAndWhiteOwl,
    MagicDoorIsBitweenBlackToadAndWhiteCentipede,
    MagicDoorIsBitweenBlackToadAndWhiteBat,
    MagicDoorIsBitweenBatAndBat,
    MagicDoorIsBitweenBatAndToad,
    MagicDoorIsBitweenBatAndCentipede,
    MagicDoorIsBitweenCentipedeAndOwl,
    MagicDoorIsBitweenCentipedeAndToad,
    MagicDoorIsBitweenOwlAndToad,
    StartSearchHubi,
    HubiMoved,
    FindHubi,
    SnapHubi,
    Congratulations,
    HubiIsInBatTile,
    HubiIsInCentipedeTile,
    HubiIsInToadTile,
    HubiIsInOwlTile,
    HubiIsInBlackBatTile,
    HubiIsInBlackCentipedeTile,
    HubiIsInBlackToadTile,
    HubiIsInBlackOwlTile,
    HubiIsInWhiteBatTile,
    HubiIsInWhiteCentipedeTile,
    HubiIsInWhiteToadTile,
    HubiIsInWhiteOwlTile,
    
}

function getMessage(messageId:MessageId):string
{
    switch(messageId)
    {
    case MessageId.Moved:
        return '移動したよ';
    case MessageId.MovedShownAisle:
        return '移動したよ、もう一度移動できるよ';
    case MessageId.OpendMagicDoor:
        return '魔法の扉が開いた。移動したよ。';
    case MessageId.AisleIsFreePassage:
        return '通路だったよ、移動できたよ。';
    case MessageId.AisleIsRabbitWindow_Moved:
        return 'ウサギ窓だったよ、移動したよ';
    case MessageId.AisleIsRabbitWindow_NoMoved:
        return 'ウサギ窓だったよ、移動できなかった';
    case MessageId.AisleIsMouseHole_Moved:
        return 'ネズミあなだったよ、移動したよ';
    case MessageId.AisleIsMouseHole_NoMoved:
        return 'ネズミあなだったよ、移動できなかった';
    case MessageId.AisleIsWall:
        return 'カベだったよ、移動できなかった';
    case MessageId.AisleIsMagicDoor:
        return '魔法の扉だったよ、移動できなかった';
    case MessageId.CannotMove:
        return 'そちらにはいけないよ';
    case MessageId.MagicDoorIsBitweenBlackBatAndWhiteBat:
        return '魔法の扉は黒いコウモリと白いコウモリの間だよ';
    case MessageId.MagicDoorIsBitweenBlackBatAndWhiteToad:
        return '魔法の扉は黒いコウモリと白いカエルの間だよ';
    case MessageId.MagicDoorIsBitweenBlackBatAndWhiteCentipede:
        return '魔法の扉は黒いコウモリと白いムカデの間だよ';
    case MessageId.MagicDoorIsBitweenBlackCentipedeAndWhiteOwl:
        return '魔法の扉は黒いムカデと白いフクロウの間だよ';
    case MessageId.MagicDoorIsBitweenBlackCentipedeAndWhiteToad:
        return '魔法の扉は黒いムカデと白いカエルの間だよ';
    case MessageId.MagicDoorIsBitweenBlackCentipedeAndWhiteBat:
        return '魔法の扉は黒いムカデと白いコウモリの間だよ';
    case MessageId.MagicDoorIsBitweenBlackOwlAndWhiteToad:
        return '魔法の扉は黒いフクロウと白いカエルの間だよ';
    case MessageId.MagicDoorIsBitweenBlackOwlAndWhiteCentipede:
        return '魔法の扉は黒いフクロウと白いムカデの間だよ';
    case MessageId.MagicDoorIsBitweenBlackToadAndWhiteOwl:
        return '魔法の扉は黒いカエルと白いフクロウの間だよ';
    case MessageId.MagicDoorIsBitweenBlackToadAndWhiteCentipede:
        return '魔法の扉は黒いカエルと白いムカデの間だよ';
    case MessageId.MagicDoorIsBitweenBlackToadAndWhiteBat:
        return '魔法の扉は黒いカエルと白いコウモリの間だよ';
    case MessageId.MagicDoorIsBitweenBatAndBat:
        return '魔法の扉はコウモリとコウモリの間だよ';
    case MessageId.MagicDoorIsBitweenBatAndToad:
        return '魔法の扉はコウモリとカエルの間だよ';
    case MessageId.MagicDoorIsBitweenBatAndCentipede:
        return '魔法の扉はコウモリとムカデの間だよ';
    case MessageId.MagicDoorIsBitweenCentipedeAndOwl:
        return '魔法の扉はムカデとフクロウの間だよ';
    case MessageId.MagicDoorIsBitweenCentipedeAndToad:
        return '魔法の扉はムカデとカエルの間だよ';
    case MessageId.MagicDoorIsBitweenOwlAndToad:
        return '魔法の扉はフクロウとカエルの間だよ';
    case MessageId.StartSearchHubi:
        return 'やっと僕の世界に来たね。でも見えない僕を捕まえられるかな？';
    case MessageId.HubiMoved:
        return '僕は移動しちゃうもんねー。壁だって通れるんだぞ。';
    case MessageId.FindHubi:
        return 'あれ！？見つかった？でも一人じゃ捕まえられないよ。';
    case MessageId.SnapHubi:
        return 'あれれー、つかまっちゃったー';
    case MessageId.Congratulations:
        return 'おめでとう！フビを捕まえたよ。あなたたちの勝ちだ。';
    case MessageId.HubiIsInBatTile:
        return 'フビはコウモリの部屋にいるよ';
    case MessageId.HubiIsInCentipedeTile:
        return 'フビはムカデの部屋にいるよ';
    case MessageId.HubiIsInToadTile:
        return 'フビはカエルの部屋にいるよ';
    case MessageId.HubiIsInOwlTile:
        return 'フビはフクロウの部屋にいるよ';
    case MessageId.HubiIsInBlackBatTile:
        return 'フビは黒いコウモリの部屋にいるよ';
    case MessageId.HubiIsInBlackCentipedeTile:
        return 'フビは黒いムカデの部屋にいるよ';
    case MessageId.HubiIsInBlackToadTile:
        return 'フビは黒いカエルの部屋にいるよ';
    case MessageId.HubiIsInBlackOwlTile:
        return 'フビは黒いフクロウの部屋にいるよ';
    case MessageId.HubiIsInWhiteBatTile:
        return 'フビは白いコウモリの部屋にいるよ';
    case MessageId.HubiIsInWhiteCentipedeTile:
        return 'フビは白いムカデの部屋にいるよ';
    case MessageId.HubiIsInWhiteToadTile:
        return 'フビは白いカエルの部屋にいるよ';
    case MessageId.HubiIsInWhiteOwlTile:
        return 'フビは白いフクロウの部屋にいるよ';
    default:
        return '';
    }
}

function getAisleTypeMessageId(aisleType:AisleTypes, canPass:boolean):MessageId
{
    switch(aisleType)
    {
    case AisleTypes.FreePassage:
        return MessageId.AisleIsFreePassage;
    case AisleTypes.MagicDoor1:
    case AisleTypes.MagicDoor2:
    case AisleTypes.MagicDoor3:
    case AisleTypes.MagicDoorOpened:
        return MessageId.AisleIsMagicDoor;
    case AisleTypes.MouseHole:
        if(canPass)
        {
            return MessageId.AisleIsMouseHole_Moved;
        }
        else
        {
            return MessageId.AisleIsMouseHole_NoMoved;
        }
    case AisleTypes.RabbitWindow:
        if(canPass)
        {
            return MessageId.AisleIsRabbitWindow_Moved;
        }
        else
        {
            return MessageId.AisleIsRabbitWindow_NoMoved;
        }
    case AisleTypes.Wall:
        return MessageId.AisleIsWall;
    }
}


function onMove(state:AppState, nextAisleNo:number, nextTileNo:number,direction:Direction):AppState
{
    
    var currentPlayer = state.players[0];
    var newMessages = state.messages;

    var nextAisle = state.aisleStates[nextAisleNo];
    var lastOperation:Operation = {type:OperationTypes.NoMove, aisle:-1,position:-1,player:PlayerType.None}
    if(state.operations.length > 0)
    {
        lastOperation = state.operations[state.operations.length-1];
    }

    if(nextAisle.isClosedMagicDoor())
    {
        //魔法の扉を開ける判定
        var nextPositionPlayers = state.players.filter(player=>player.position === nextTileNo)
        if(nextPositionPlayers.length > 0)
        {
            newMessages = newMessages.concat({
                id:newMessages.length, 
                icon:MessageIcons.GameMaster,
                text:getMessage(MessageId.OpendMagicDoor)});

            // 通路を更新
            var newAisle = nextAisle.changeType(AisleTypes.MagicDoorOpened);
            newAisle = newAisle.changeShown(true);
            var newAisles = state.aisleStates.slice();
            newAisles[newAisle.index] = newAisle;

            // 移動
            var newPlayer:Player = currentPlayer.createNewPlayer(nextTileNo);
            var newPlayers = state.players.slice(1).concat(newPlayer);

            // 操作を記録
            var newOperations = state.operations.concat([{
                aisle:nextAisleNo, 
                player:currentPlayer.playerType, 
                type:OperationTypes.Move, 
                position:newPlayer.position}]);

            var newGamePhase = state.phase;
            var newHubiPosition = state.hubiPosition;
            // すべての魔法の扉が開いたら、フビを探すモードへ変更
            if(newAisles.filter(_=>_.isClosedMagicDoor()).length === 0)
            {
                newGamePhase = GamePhase.SearchHubi;

                newMessages = newMessages.concat({
                    id:newMessages.length, 
                    icon:MessageIcons.GameMaster,
                    text:getMessage(MessageId.StartSearchHubi)});
                do
                {
                    newHubiPosition = Math.floor(Math.random() * state.tileStates.length);
                }
                while(newPlayers.filter(_=>_.position === newHubiPosition).length !== 0)
            }

            return objectAssign({}, state, {
                players:newPlayers,
                aisleStates:newAisles, 
                operations:newOperations, 
                messages:newMessages,
                phase:newGamePhase,
                hubiPosition:newHubiPosition});                            
        }
    }
    if(nextAisle.shown)
    {
        if(currentPlayer.canPass(nextAisle) && lastOperation.player != currentPlayer.playerType)
        {
            //ダブルムーブ
            var newPlayer = currentPlayer.createNewPlayer(nextTileNo);
            var newPlayers = state.players.slice();
            newPlayers[0] = newPlayer;

            newMessages = newMessages.concat({
                id:newMessages.length, 
                icon:MessageIcons.GameMaster,
                text:getMessage(MessageId.MovedShownAisle)});
                
            // 操作を記録
            var newOperations = state.operations.concat([{
                aisle:nextAisleNo, 
                player:currentPlayer.playerType, 
                type:OperationTypes.QuickMove, 
                position:newPlayer.position}]);
            
            // 終了判定
            var newGamePhase = state.phase;
            if(isSnapHubi(state))
            {
                newMessages = newMessages.concat({
                    id:newMessages.length, 
                    icon:MessageIcons.GameMaster,
                    text:getMessage(MessageId.Congratulations)});
                newGamePhase = GamePhase.Ending;
            }

            return objectAssign({}, state, {
                players:newPlayers, 
                operations:newOperations, 
                messages:newMessages, 
                phase:newGamePhase});                    
        }
        if(currentPlayer.canPass(nextAisle))
        {
            //単なる移動
            var newPlayer = currentPlayer.createNewPlayer(nextTileNo);
            var newPlayers = state.players.slice(1).concat(newPlayer);
            
            newMessages = newMessages.concat({
                id:newMessages.length, 
                icon:MessageIcons.GameMaster,
                text:getMessage(MessageId.Moved)});
                
            // 操作を記録
            var newOperations = state.operations.concat([{
                aisle:nextAisleNo, 
                player:currentPlayer.playerType, 
                type:OperationTypes.Move, 
                position:newPlayer.position}]);

            // 終了判定
            var newGamePhase = state.phase;
            if(isSnapHubi(state))
            {
                newMessages = newMessages.concat({
                    id:newMessages.length, 
                    icon:MessageIcons.GameMaster,
                    text:getMessage(MessageId.Congratulations)});
                newGamePhase = GamePhase.Ending;
            }
            
            return objectAssign({}, state, {
                players:newPlayers, 
                operations:newOperations, 
                messages:newMessages,
                phase:newGamePhase});
        }
        else
        {
            // このターンは終わり
            var newPlayers = state.players.slice(1).concat(currentPlayer);
            
            //そちらにはいけない
            newMessages = newMessages.concat({
                id:newMessages.length, 
                icon:MessageIcons.GameMaster,
                text:getMessage(MessageId.CannotMove)});
    
            return objectAssign({}, state, {players:newPlayers,messages:newMessages});
        }
    }
    else
    {
        if(currentPlayer.canPass(nextAisle))
        {
            newMessages = newMessages.concat({
                id:newMessages.length, 
                icon:MessageIcons.GameMaster,
                text:getMessage(getAisleTypeMessageId(nextAisle.type, true))});
    
            // 移動先へ移動
            var newPlayer = currentPlayer.createNewPlayer(nextTileNo);
            var newPlayers = state.players.slice(1).concat(newPlayer);
                
            // 操作を記録
            var newOperations = state.operations.concat([{
                aisle:nextAisleNo, 
                player:currentPlayer.playerType, 
                type:OperationTypes.Move, 
                position:newPlayer.position}]);

            // 通路を更新
            var newAisle = nextAisle.changeShown(true);
            var newAisles = state.aisleStates.slice();
            newAisles[newAisle.index] = newAisle;

            // 終了判定
            var newGamePhase = state.phase;
            if(isSnapHubi(state))
            {
                newMessages = newMessages.concat({
                    id:newMessages.length, 
                    icon:MessageIcons.GameMaster,
                    text:getMessage(MessageId.Congratulations)});
                newGamePhase = GamePhase.Ending;
            }

            return objectAssign({}, state, {
                players:newPlayers,
                aisleStates:newAisles, 
                operations:newOperations, 
                messages:newMessages,
                phase:newGamePhase });
        }
        else
        {
            newMessages = newMessages.concat({
                id:newMessages.length, 
                icon:MessageIcons.GameMaster,
                text:getMessage(getAisleTypeMessageId(nextAisle.type, false))});

            //現在の位置のまま
            var newPlayer = currentPlayer;
            var newPlayers = state.players.slice(1).concat(newPlayer);

            // 通路を更新
            var newAisle = nextAisle.changeShown(true);
            var newAisles = state.aisleStates.slice();
            newAisles[newAisle.index] = newAisle;

            // 操作を記録
            var newOperations = state.operations.concat([{
                aisle:nextAisleNo, 
                player:currentPlayer.playerType, 
                type:OperationTypes.Move, 
                position:newPlayer.position}]);
    
            return objectAssign({}, state, {players:newPlayers,aisleStates:newAisles, operations:newOperations, messages:newMessages});                    
        }
    }
}

function isSnapHubi(state:AppState):boolean
{
    return state.players.filter(_=>_.position === state.hubiPosition).length === 2;
}

(window as any).AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
var context = new AudioContext();


// サウンドを再生
var playSound = function(buffer:AudioBuffer) {
    // source を作成
    var source = context.createBufferSource();
    // buffer をセット
    source.buffer = buffer;
    // context に connect
    source.connect(context.destination);
    // 再生
    source.start(0);
  };

var audioBuffer:AudioBuffer;



var getAudioBuffer = function(url:string) {  
    var req = new XMLHttpRequest();
    // array buffer を指定
    req.responseType = 'arraybuffer';
  
    req.onreadystatechange = function() {
      if (req.readyState === 4) {
        if (req.status === 0 || req.status === 200) {
          context.decodeAudioData(req.response, function(buffer) {
            audioBuffer = buffer;
            });
        }
      }
    };
  
    req.open('GET', url, true);
    req.send('');
  };

  getAudioBuffer('se.mp3');