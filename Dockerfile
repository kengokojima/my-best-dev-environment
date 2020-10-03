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
    autoconf automake libtool make tiff jpeg zlib zlib-dev pkgconf nasm file gcc musl-dev \
    build-base \
    neovim \
    python-dev \
    py-pip \
    python3-dev \
    py3-pip

# install oh-my-zsh
RUN apk update && apk add --virtual=module curl && sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

RUN curl https://raw.githubusercontent.com/Shougo/dein.vim/master/bin/installer.sh > installer.sh && sh ./installer.sh ~/.cache/dein

RUN git config --global user.name 'kengokojima' && git config --global user.email 'islands0802.k.k@gmail.com'

RUN pip3 install neovim && mkdir -p ~/.config/nvim && mkdir -p ~/.vim/

RUN git clone https://3fe615c1dd3dc6a949d7060888801a5e882ee3bb:x-oauth-basic@github.com/kengokojima/dotfiles.git

RUN cp ./dotfiles/vimrc/init.vim ~/.config/nvim/ && cp ./dotfiles/.vim/dein.toml ~/.vim/

RUN rm -r ./dotfiles/
