const DOM = 
{
    init: 
    {
        button: document.getElementById('initButton'),
        nameField: document.getElementById('initNameField')
    }
} as any

DOM.init.button.addEventListener('click', (event : any) => 
{ 
    DOM.init.button.hidden = true;
    DOM.init.nameField.hidden = true;
    DOM.canvas.hidden = false;

    onJoiningGame({
        name: DOM.init.nameField.value
    }, event);
});