export const Component = (name, parent = document.body) => {
    const div = document.createElement('div');
    div.id = name;
    parent.appendChild(div);
    return div;
};