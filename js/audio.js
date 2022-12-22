let laserSound = new Audio('../assets/https:/i.redd.it/shoot02wav-14563.mp3')
function pieceSound(){
    laserSound.volume = 0.25
    laserSound.play()
}

export{
    pieceSound
}