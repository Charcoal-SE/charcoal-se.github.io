## Installing Ruby and Rails

Steps in this section are taken from a [Digital Ocean tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rvm-on-ubuntu-16-04)

1. Add RVM's key to the system

        gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

2. Move to `/tmp` and start the install of the latest stable version of Rails

        cd /tmp
        \curl -sSL https://get.rvm.io -o rvm.sh
        cat /tmp/rvm.sh | bash -s stable --rails

3. `source` the RVM scripts (insert your user's name in the command)

        source /home/USERNAMEHERE/.rvm/scripts/rvm

4. You should now be able to run `ruby --version` and get a response

## Setting up metasmoke

5. Clone the metasmoke repository (or your fork) to a directory of your choice (probably not `/tmp`)

        git clone https://github.com/Charcoal-SE/metasmoke.git

6. Navigate to the repository you just cloned
7. Install a couple needed gems

        gem install bundler 

8. Install the metasmoke bundles

        bundle install

9. If there are any errors with the previous step, you will need to correct those before proceeding. The most common one is with MySQL and is usually solved by running and then repeating the previous step

        sudo apt-get install libmysqlclient-dev
        gem uninstall mysql2
        gem install mysql2

10. When the bundle install has completed, you'll get a notice about how to restart Passenger. 
11. Log into MySQL with a user that has permissions to create a database and users. `root` may work best 

        mysql -u root -p

12. Create the metasmoke database and metasmoke_test database

        CREATE DATABASE metasmoke;
        CREATE DATABASE metasmoke_test;

13. Create the metasmoke user and password. This user will only be able to access MySQL locally. You should still select a strong password. Grant this user privileges on the metasmoke database

        CREATE USER 'metasmoke'@'localhost' IDENTIFIED BY 'password';
        GRANT ALL PRIVILEGES ON `metasmoke`.* TO `metasmoke`@`localhost`;
        GRANT ALL PRIVILEGES ON `metasmoke_test`.* TO `metasmoke`@`localhost`;
        FLUSH PRIVILEGES; 

14. Inside the metasmoke folder, from the command line, copy the `database.sample.yml` to `database.yml`:

        cd config
        cp database.sample.yml database.yml

15. Open database.yml in your editor of choice. Replace the `development:` section with something like this, using your password on the `password` line: 

        development:
          adapter: mysql2
          database: metasmoke
          encoding: utf8
          username: metasmoke
          password: yourpass
          host: 127.0.0.1
          port: 3306

If there are any `adapter: sqlite3` databases in there, remove them if you don't need them, or convert them to `adapter: mysql2`.

16. Copy the sample configuration to `config.yml`

        cp config.sample.yml config.yml

If you want integrations to work, you will need to update the file with real credentials for SES, Github, and/or StackExchange.  The redirect URLs in the Stack Exchange settings should point back to your instance.

17. You need to have Redis up and running, too.

        sudo apt-get install -y redis-server

If you are unable to find Redis for your platform (because you are on something older or just different than a reasonably recent Ubuntu or Debian), see their installation instructions at https://redis.io/download#installation

18. Time to set up the metasmoke database. Navigate back to the metasmoke root directory (you are probably in `metasmoke/config` right now)

        rails db:create
        rails db:schema:load
        rails db:seed 

19. Update nodejs

        curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - 
        sudo apt-get install nodejs 

20. Yarn needs to be installed to properly serve the web content

        curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
        echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
        sudo apt-get update && sudo apt-get install yarn
        yarn install

21. Start the local server

        foreman start

22. Your local instance of metasmoke is now on http://localhost:5000

To actually use it, you'll want to use the "Sign up" button in the web UI to create a local user, then assign admin and developer roles to this first user from the console:

        rails c

At the `irb` prompt, type

        User.first.add_role(:admin)
        User.first.add_role(:developer)

(There will be a significant amount of output from Rails after each of these commands, showing how the roles table is updated with a new role, and then the user is assigned this role.)