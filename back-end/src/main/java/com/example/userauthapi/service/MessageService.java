package com.example.userauthapi.service;

import com.example.userauthapi.entity.Message;
import com.example.userauthapi.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void saveMessage(Message message) {
        messageRepository.save(message);
    }
    public List<Message> getAllMessages() {
        return messageRepository.findAll(); // استدعاء findAll لجلب جميع الرسائل
    }
}
