export const Component = (name, parent = document.body) => {
    const div = document.createElement('div');
    div.id = name;
    div.classList.add('component');
    
    const heading = document.createElement('h2');
    heading.appendChild(document.createTextNode(name));
    div.appendChild(heading);
    
    parent.appendChild(div);
    return div;
};