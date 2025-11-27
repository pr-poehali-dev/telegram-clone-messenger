import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  avatar: string;
}

interface Contact {
  id: number;
  name: string;
  status: string;
  online: boolean;
  avatar: string;
}

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts'>('chats');
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [messageInput, setMessageInput] = useState('');

  const chats: Chat[] = [
    { id: 1, name: 'Анна Смирнова', lastMessage: 'Привет! Как дела?', time: '14:32', unread: 2, online: true, avatar: 'АС' },
    { id: 2, name: 'Команда разработки', lastMessage: 'Новый релиз завтра', time: '13:15', unread: 5, online: false, avatar: 'КР' },
    { id: 3, name: 'Михаил Петров', lastMessage: 'Отправил документы', time: '11:20', unread: 0, online: true, avatar: 'МП' },
    { id: 4, name: 'Екатерина Волкова', lastMessage: 'Спасибо большое!', time: 'Вчера', unread: 0, online: false, avatar: 'ЕВ' },
    { id: 5, name: 'Дизайнеры', lastMessage: 'Макеты готовы', time: 'Вчера', unread: 1, online: true, avatar: 'Д' },
  ];

  const contacts: Contact[] = [
    { id: 1, name: 'Анна Смирнова', status: 'В сети', online: true, avatar: 'АС' },
    { id: 2, name: 'Михаил Петров', status: 'В сети', online: true, avatar: 'МП' },
    { id: 3, name: 'Екатерина Волкова', status: 'Была 2 часа назад', online: false, avatar: 'ЕВ' },
    { id: 4, name: 'Александр Иванов', status: 'Был 5 минут назад', online: false, avatar: 'АИ' },
    { id: 5, name: 'Мария Козлова', status: 'В сети', online: true, avatar: 'МК' },
  ];

  const messages: Message[] = [
    { id: 1, text: 'Привет! Как твои дела?', time: '14:30', isMine: false },
    { id: 2, text: 'Привет! Всё отлично, спасибо! А у тебя?', time: '14:31', isMine: true },
    { id: 3, text: 'Тоже всё хорошо! Хотела спросить про проект', time: '14:32', isMine: false },
    { id: 4, text: 'Конечно, слушаю', time: '14:32', isMine: true },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput('');
    }
  };

  const currentChat = chats.find(c => c.id === selectedChat);

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl h-[90vh] bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex">
        
        {/* Sidebar */}
        <div className="w-96 border-r border-purple-100 flex flex-col bg-white/50">
          {/* Header */}
          <div className="p-6 border-b border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold bg-gradient-purple bg-clip-text text-transparent">
                Мессенджер
              </h1>
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-purple-100">
                <Icon name="Settings" size={20} />
              </Button>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Поиск..." 
                className="pl-10 bg-white/80 border-purple-200 rounded-2xl focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 px-6 py-4 border-b border-purple-100">
            <Button
              variant={activeTab === 'chats' ? 'default' : 'ghost'}
              className={`flex-1 rounded-xl ${activeTab === 'chats' ? 'bg-gradient-purple' : ''}`}
              onClick={() => setActiveTab('chats')}
            >
              <Icon name="MessageCircle" size={18} className="mr-2" />
              Чаты
            </Button>
            <Button
              variant={activeTab === 'contacts' ? 'default' : 'ghost'}
              className={`flex-1 rounded-xl ${activeTab === 'contacts' ? 'bg-gradient-purple' : ''}`}
              onClick={() => setActiveTab('contacts')}
            >
              <Icon name="Users" size={18} className="mr-2" />
              Контакты
            </Button>
          </div>

          {/* Chat/Contact List */}
          <ScrollArea className="flex-1">
            {activeTab === 'chats' ? (
              <div className="p-3">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`p-4 rounded-2xl mb-2 cursor-pointer transition-all duration-200 hover:bg-purple-50 animate-fade-in ${
                      selectedChat === chat.id ? 'bg-gradient-to-r from-purple-100 to-pink-100' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                          <AvatarFallback className="bg-gradient-purple text-white font-semibold">
                            {chat.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {chat.online && (
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground truncate">{chat.name}</h3>
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                          {chat.unread > 0 && (
                            <Badge className="bg-gradient-purple ml-2 text-xs px-2">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-4 rounded-2xl mb-2 cursor-pointer transition-all hover:bg-purple-50 animate-fade-in"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                          <AvatarFallback className="bg-gradient-blue text-white font-semibold">
                            {contact.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gradient-to-br from-white/30 to-purple-50/30">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-purple-100 bg-white/60 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                        <AvatarFallback className="bg-gradient-purple text-white font-semibold">
                          {currentChat?.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {currentChat?.online && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div>
                      <h2 className="font-bold text-lg text-foreground">{currentChat?.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {currentChat?.online ? 'В сети' : 'Был(а) недавно'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" className="rounded-full hover:bg-purple-100">
                      <Icon name="Phone" size={20} className="text-primary" />
                    </Button>
                    <Button size="icon" variant="ghost" className="rounded-full hover:bg-purple-100">
                      <Icon name="Video" size={20} className="text-primary" />
                    </Button>
                    <Button size="icon" variant="ghost" className="rounded-full hover:bg-purple-100">
                      <Icon name="MoreVertical" size={20} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isMine ? 'justify-end' : 'justify-start'} animate-slide-in`}
                    >
                      <div
                        className={`max-w-md px-4 py-3 rounded-2xl ${
                          message.isMine
                            ? 'bg-gradient-purple text-white rounded-br-md'
                            : 'bg-white text-foreground rounded-bl-md shadow-md'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <span className={`text-xs mt-1 block ${message.isMine ? 'text-purple-100' : 'text-muted-foreground'}`}>
                          {message.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-6 border-t border-purple-100 bg-white/60 backdrop-blur-sm">
                <div className="flex gap-3">
                  <Button size="icon" variant="ghost" className="rounded-full hover:bg-purple-100">
                    <Icon name="Paperclip" size={20} />
                  </Button>
                  <Input
                    placeholder="Написать сообщение..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-white border-purple-200 rounded-2xl focus:ring-2 focus:ring-primary"
                  />
                  <Button size="icon" variant="ghost" className="rounded-full hover:bg-purple-100">
                    <Icon name="Smile" size={20} />
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    className="rounded-full bg-gradient-purple hover:opacity-90 transition-opacity px-6"
                  >
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center animate-fade-in">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-purple flex items-center justify-center">
                  <Icon name="MessageCircle" size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Выберите чат
                </h3>
                <p className="text-muted-foreground">
                  Начните общение с друзьями и коллегами
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
