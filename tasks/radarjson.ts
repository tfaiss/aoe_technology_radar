#!/usr/bin/env node

import {createRadar} from "./radar";
import {save} from "./file";
import {copyFileSync, mkdir, mkdirSync} from "fs";
import {quadrants} from "../src/config";


export const radarJsonGenerator = (async () => {
    try {
        console.log('start')
        const radar = await createRadar();

        // console.log(radar);

        save(JSON.stringify(radar), 'rd.json')
        save(`import React from 'react';
import ReactDOM from 'react-dom';
import App from 'aoe_technology_radar/src/components/App';
import 'aoe_technology_radar/src/index.scss';
import {Item} from "aoe_technology_radar/src/model";
import radardata from './rd.json';

ReactDOM.render(
    <React.StrictMode>
        <App items={radardata.items as Item[]} releases={radardata.releases as string[]} />
    </React.StrictMode>,
    document.getElementById('root')
);
`, 'index.tsx')

        console.log('Built radar');
    } catch (e) {
        console.error('error:', e);
    }
})
