
playfield = [0,0,0,0,0,0,0,0,0]
activePlayer = 1

def otherPlayer(player):
    if player == 0: 
        player = 1
    else:
        player = 0

def playerReadyToWinHorizontalyAtX(board,player,place):
    if (board[place]==player) and (board[place+1]==player) and (board[place+2]!=otherPlayer(player)):     
       return 1
    return 0

def playerReadyToWin(board,player,depth):
    sum=0
    for i in range(0,2):
        sum+=playerReadyToWinHorizontalyAtX(board,player,i*3)
    return sum

def playerTwoInARow(board,player,depth):
    return 0

def playerCanBlock(board,player,depth):
    return 0

def objectiveFunction(board,player,depth):
    score = 0
    if (playerReadyToWin(board,player,depth)):
        score += 10000
    if (playerReadyToWin(board,otherPlayer(player),depth)):
        score -= 10000    
    score += 10 * playerTwoInARow(board,player,depth)        
    score -= 10 * playerTwoInARow(board,otherPlayer(player),depth)        
    score += 3 * playerCanBlock(board,player,depth)        
    score -= 3 * playerCanBlock(board,otherPlayer(player),depth)        
    
    return score

def makeMove(board,place,player):
    if board[place] == 0:
        board[place] = player
        if player == 1:
            player = 2
        else:
            player = 1
    return player

def canMakeMove(board,move):
    if move > 8 or move < 0:
        return False
    elif board[move] != 0:
        return False
    else:
        return True

def drawBoard(board):
    i=1
    for move in board:
        print("|",board[move],end="")
        if i%3 == 0:
            print("|")
        i+=1


def minmax(board,turn,depth):
    return 0

minmax(playfield,activePlayer,0)

while True:
    print("It's time for ",activePlayer," to play")
    drawBoard(playfield)
    print("Your chance to win = ",objectiveFunction(playfield,activePlayer,0))
    try:
        move = int(input("Move:"))
    except ValueError:
        move = 666
    if canMakeMove(playfield, move):
        activePlayer=makeMove(playfield,move,activePlayer)
        
    else:
        print("Wrong move")
    
