Used PM2(process manager 2) for clustoring 
Worker thread for better handle cpu heavy task by assigning cpu heavy task to Worker thread

<!-- basic pm2 commands -->
pm2 start app.js
pm2 stop app.js
pm2 reload app
pm2 restart app
pm2 monit | pm2 monit app
pm2 logs
pm2 list
