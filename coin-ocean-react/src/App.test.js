import { configure, shallow } from 'enzyme';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });


describe('<App />', () => {

 it('renders a <App /> components', () => {
   const wrapper = shallow(<App />);
   expect(wrapper.find('header.App-header').length).toEqual(1);
 });

 it('renders a <App /> components with img', () => {
   const wrapper = shallow(<App />);
   expect(wrapper.find('img.App-logo').length).toEqual(1);
 });

 it('renders a <App /> components with title', () => {
   const wrapper = shallow(<App />);
   expect(wrapper.find('a.App-link').length).toEqual(1);
 });
 it('renders without crashing', () => {
   const div = document.createElement('div');
   ReactDOM.render(<App />, div);
   ReactDOM.unmountComponentAtNode(div);
 });

});

