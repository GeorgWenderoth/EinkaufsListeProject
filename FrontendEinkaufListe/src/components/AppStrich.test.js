import React from 'react';
import renderer from 'react-test-renderer';
import ListElement from './listElement';


test('Kachel changes when clicked', () =>{
    const component= renderer.create(
        <ListElement/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})
