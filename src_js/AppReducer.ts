


export interface AppState
{
    map: Map;
    operations: Operation[];
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
}

export interface Aisle
{
    index:number;
    type:AisleTypes;
    shown:boolean;
    tiles:NextTo;
}

export interface Tile
{
    index: number;
    type: TileTypes;
    hadHintDoorHint: boolean;
    hadHintFubi: boolean;
    aisles : NextTo;
}

export enum OperationTypes
{
    Move,
    Hint,
    NoMove
}

export interface Operation
{
    type: OperationTypes,
    position: number,
    aisle: number
}

export interface NextTo
{
    up:number;
    down:number;
    left:number;
    right:number;
}

function createNewMap() : Map
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
        ["T-1","A12",   "","A13",   "","A14",   "","A15","T-1"],
        ["A-1", "T4", "A3", "T5", "A4", "T6", "A5", "T7","A-1"],
        ["T-1","A16",   "","A17",   "","A18",   "","A19","T-1"],
        ["A-1", "T8", "A6", "T9", "A7","T10", "A8","T11","A-1"],
        ["T-1","A20",   "","A21",   "","A22",   "","A23","T-1"],
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

            result.Tiles[tileNo]={
                index : tileNo,
                type : tileType,
                hadHintDoorHint : false,
                hadHintFubi : false,
                aisles : {
                    up : upAisleNo,
                    down : downAisleNo,
                    left : leftAisleNo,
                    right : rightAisleNo
                }
            };
        }
    }
    for(var $y = 0; $y < 4; $y++)
    {
        for(var $x = 0; $x < 3; $x++)
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
                shown : false,
                type : AisleTypes.FreePassage,
                tiles : {
                    up : upTile,
                    down: downTile,
                    left : leftTile,
                    right : rightTile
                }

            }
        }
    }
    for(var $y = 0; $y < 3; $y++)
    {
        for(var $x = 0; $x < 4; $x++)
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
                shown : false,
                type : AisleTypes.FreePassage,
                tiles : {
                    up : upTile,
                    down: downTile,
                    left : leftTile,
                    right : rightTile
                }
            }
        }
    }

    var aisleTypes = DifficultyNormal.slice(0, DifficultyNormal.length);
    for(var index = 0; index < result.Aisles.length; index++)
    {
        var aisle = result.Aisles[index];

        var selectedIndex = Math.round(Math.random() * aisleTypes.length);
        var selectedAisle = aisleTypes[selectedIndex]
        aisleTypes.splice(selectedIndex, 1);
    
        aisle.type = selectedAisle;
    }


    
    return result;
}

function IsValidMap(map:Map) : boolean
{
    



    return true;
}

class Player
{
    playerType: PlayerType;

    canPass(aisle: Aisle) : boolean
    {
        if(aisle.type == AisleTypes.Wall ||
            aisle.type == AisleTypes.MagicDoor1 ||
            aisle.type == AisleTypes.MagicDoor2 ||
            aisle.type == AisleTypes.MagicDoor3)
        {
            return false;
        }
        if(this.playerType == PlayerType.BlueRabbit || 
            this.playerType == PlayerType.GreenRabbit)
        {
            if(aisle.type == AisleTypes.MouseHole)
            {
                return false;
            }
        }
        
        if(this.playerType == PlayerType.RedMouse || 
            this.playerType == PlayerType.YellowMouse)
        {
            if(aisle.type == AisleTypes.RabbitWindow)
            {
                return false;
            }
        }
        
        return true;
    }


}

function getReachable(map:Map, startTile:Tile, player:Player, reachableTiles: number[]) : void
{
    if(reachableTiles.indexOf(startTile.index) != -1)
    {
        return;
    }

    var tile = startTile;

    if(tile.aisles.up != -1)
    {
        if(player.canPass(map.Aisles[tile.aisles.up]))
        {
            var nextTile = map.Tiles[map.Aisles[tile.aisles.up].tiles.up];
            if(reachableTiles.indexOf(nextTile.index) == -1)
            {
                reachableTiles.push(nextTile.index);
                getReachable(map, nextTile, player, reachableTiles);
            }
        }
    }
    if(tile.aisles.down != -1)
    {
        if(player.canPass(map.Aisles[tile.aisles.down]))
        {
            var nextTile = map.Tiles[map.Aisles[tile.aisles.down].tiles.down];
            if(reachableTiles.indexOf(nextTile.index) == -1)
            {
                reachableTiles.push(nextTile.index);
                getReachable(map, nextTile, player, reachableTiles);
            }
        }
    }
    if(tile.aisles.left != -1)
    {
        if(player.canPass(map.Aisles[tile.aisles.left]))
        {
            var nextTile = map.Tiles[map.Aisles[tile.aisles.left].tiles.left];
            if(reachableTiles.indexOf(nextTile.index) == -1)
            {
                reachableTiles.push(nextTile.index);
                getReachable(map, nextTile, player, reachableTiles);
            }
        }
    }
    if(tile.aisles.right != -1)
    {
        if(player.canPass(map.Aisles[tile.aisles.right]))
        {
            var nextTile = map.Tiles[map.Aisles[tile.aisles.right].tiles.right];
            if(reachableTiles.indexOf(nextTile.index) == -1)
            {
                reachableTiles.push(nextTile.index);
                getReachable(map, nextTile, player, reachableTiles);
            }
        }
    }
}