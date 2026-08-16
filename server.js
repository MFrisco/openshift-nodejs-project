const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', async (req, res) => {
    try {
        const r = await axios.post('http://opa-service:8181/v1/data/authz/allow', {
            input: { user: 'meghanfrisco' }
        });
        if (r.data.result) {
            res.send(`
                <div style="font-family:sans-serif;padding:20px;text-align:center;margin-top:50px;">
                    <h1 style="color:#0066cc;font-size:2.5em;">Welcome to OpenShift Playground</h1>
                    <p style="font-size:1.2em;"><strong>Username:</strong> meghanfrisco</p>
                    <div style="display:inline-block;background-color:#e6f4ea;color:#137333;padding:10px 20px;border-radius:5px;font-weight:bold;font-size:1.1em;margin-top:10px;">
                        ✔️ OPA Status: ACCESS ALLOWED
                    </div>
                </div>
            `);
        } else {
            res.status(403).send('Blocked by OPA Policy');
        }
    } catch (e) {
        res.status(500).send('Error connecting to OPA: ' + e.message);
    }
});

app.listen(PORT, () => console.log('Listening on port ' + PORT));
