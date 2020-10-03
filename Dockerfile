FROM node:lts-alpine

#SHELL ["/bin/bash", "-c"]

ENV USER kengokojima
ENV HOME /home/${USER}
ENV PW islands0802
#ENV SHELL /usr/bin/zsh
ENV TZ Asia/Tokyo

WORKDIR /home/${USER}/Documents

RUN apk update && apk upgrade

RUN apk add --no-cache \
    zsh \
    git \
    autoconf automake libtool make tiff jpeg zlib zlib-dev pkgconf nasm file gcc musl-dev

# install oh-my-zsh
RUN apk update && apk add --virtual=module curl && sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

#RUN git clone https://5c71c7d8729f1cc19b46468eb00cae56273041c1:x-oauth-basic@github.com/kengokojima/dotfiles.git

#RUN rm -r ./dotfiles/

