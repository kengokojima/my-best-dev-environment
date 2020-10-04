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
    py3-pip \
    cargo

# install oh-my-zsh
RUN apk update && apk add --virtual=module curl && sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

RUN curl https://raw.githubusercontent.com/Shougo/dein.vim/master/bin/installer.sh > installer.sh && sh ./installer.sh ~/.cache/dein

RUN git config --global user.name 'kengokojima' && git config --global user.email 'islands0802.k.k@gmail.com'

RUN pip3 install neovim && mkdir -p ~/.config/nvim && mkdir -p ~/.vim/

RUN git clone https://ebd3430fa2c0bc24e076e55e48e72d7d05392073:x-oauth-basic@github.com/kengokojima/dotfiles.git

RUN cp ./dotfiles/vimrc/init.vim ~/.config/nvim/ && cp ./dotfiles/.vim/dein.toml ~/.vim/

RUN rm -r ./dotfiles/

RUN git clone https://github.com/BurntSushi/ripgrep && \
    cd ripgrep && \
    cargo build --release && \
    cp ./release/rg /usr/local/bin && \
    rm -rf ../ripgrep/