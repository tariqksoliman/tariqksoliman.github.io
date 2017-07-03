//A straight hard-coded mini

var homeDir = true;

jQuery(function($, undefined) {
    $('body').terminal(function(command) {
        switch( command ) {
            case 'help':
                    this.echo( helpMessage );
                break;
            case 'ls':
                    if( homeDir )
                        this.echo( lsMessageHome );
                    else
                        this.echo( lsMessageProjects );
                break;
            case 'cd Projects':
                    if( homeDir ) {
                        this.set_prompt( 'ts:~/Projects> ' );
                        homeDir = false;
                    }
                    else
                        this.echo( 'cd Projects: No such file or directory' );
                break;
            case 'cd ~':
            case 'cd ../':
                    if( !homeDir ) {
                        this.set_prompt( 'ts:~> ' );
                        homeDir = true;
                    }
                break;
            case 'open about.txt':
                    if( homeDir )
                        this.echo( aboutTxt );
                    else
                        this.echo( 'open about.txt: No such file or directory' );
                break;
            case 'open BML-Traffic-Model.html':
                    if( !homeDir )
                        this.echo( openUrl( "https://tariqksoliman.github.io/BML-Traffic-Model/" ) );
                break;
            case 'open Fractal-Inferno.html':
                    if( !homeDir )
                        this.echo( openUrl( "https://tariqksoliman.github.io/Fractal-Inferno/" ) );
                break;
            case 'open ReactChess.html':
                    if( !homeDir )
                        this.echo( openUrl( "https://tariqksoliman.github.io/ReactChess/" ) );
                break;
            case 'open Vissonance.html':
                    if( !homeDir )
                        this.echo( openUrl( "https://tariqksoliman.github.io/Vissonance/" ) );
                break;
            case 'clear':
                this.clear();
                break;
            default:
                this.echo( command + ": command not found.\nType 'help' for a list of commands" );
        }
        this.echo( ' ' );
        if (command !== '') {
            /*
            var result = window.eval(command);
            if (result != undefined) {
                this.echo(String(result));
            }
            */
        }
    }, {
        greetings: greetings,
        name: 'ts_site',
        height: window.innerHeight - 16,
        width: window.innerWidth - 16,
        prompt: 'ts:~> '
    });
});

var greetings = ( function() { /*
+=========================+
| Tariq Soliman Portfolio |
+=========================+            
*/ } ).toString().split( '\n' ).slice( 1, -1 ).join( '\n' );

var helpMessage = ( function() { /*

Help
    cd [dirname]:
        Change directory.
        Examples:
            cd Projects
            cd ../
    clear:
        Clear the terminal.
    help:
        You already know this one!
    ls:
        List information about the files in the current directory.
    open:
        Open a text file or url.
*/ } ).toString().split( '\n' ).slice( 1, -1 ).join( '\n' );

var lsMessageHome = ( function() { /*
about.txt
Projects
*/ } ).toString().split( '\n' ).slice( 1, -1 ).join( '\n' );

var lsMessageProjects = ( function() { /*
BML-Traffic-Model.html
Fractal-Inferno.html
ReactChess.html
Vissonance.html
*/ } ).toString().split( '\n' ).slice( 1, -1 ).join( '\n' );


var aboutTxt = ( function() { /*
Hi. I am a person and you are reading what I have previously written!
*/ } ).toString().split( '\n' ).slice( 1, -1 ).join( '\n' );


function openUrl( url ) {
    var win = window.open( url, '_blank' );
    if (win) {
        win.focus();
        return '';
    } else {
        return 'Please allow popups for this website';
    }
}