const github_auth_key = process.env.github_auth_key;
const workflow_id = process.env.workflow_id;
const githubapi_url = process.env.githubapi_url;

import axios from 'axios';

const headers = {
    Authorization: `Bearer ${github_auth_key}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
};
const data = {
    ref: 'main',
};
const url = githubapi_url + `/actions/workflows/${workflow_id}/dispatches`;

export default {
    deploy() {
        axios.post(url, data, {
            headers: headers,
        });

        console.log('Starting Deploy workflow...');
    },
};
