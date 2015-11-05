# Startup-Ecosystems

Forked from Jacprada's WDI project here: https://github.com/jacprada/Startup-Ecosystems

To work on it locally in Terminal: 
<code>
git clone git@github.com:evanjmg/Startup-Ecosystems.git
</code>
<p>
To setup, type (make sure you have NodeJS and Bower installed):
<code>
npm install
bower install
</code>
</p>

<p>
Fill database with startups:
<code>
node tasks/importStartups.js
</code>

</p>
<p>
Fill database with members (see full docs here: https://docs.mongodb.org/getting-started/shell/import-data/):
<code>
mongoimport --host 127.0.0.1  -d startup-ecosystems -c communitymembers < communitymembers.json
</code>
</p>
<p>
Run UI to visually see startups and community members (you must create an account):
<code>
node app.js
</code>
</p>
## Features that need work:
<br/>
Getting Startup emails (emails are being retrieved, but not properly inserted in database)<br/>
Scaping other sites for more data
