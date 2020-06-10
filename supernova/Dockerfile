FROM nginx:stable-alpine

# copy from dist to nginx root dir
COPY dist/supernova /usr/share/nginx/html

# copy reversed proxy
#COPY nginx.site.template /etc/nginx/conf.d/

# expose port 80
EXPOSE 80

#CMD envsubst '${BACKEND_URI}' < /etc/nginx/conf.d/nginx.site.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'

# set author info
# LABEL maintainer="WeihanLi"

# run nginx in foreground
# https://stackoverflow.com/questions/18861300/how-to-run-nginx-within-a-docker-container-without-halting
CMD ["nginx", "-g", "daemon off;"]
