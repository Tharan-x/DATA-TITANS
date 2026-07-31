import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Header } from '../components/Header';
import { farmApi } from '../services/farmApi';
import { useLanguageStore } from '../store/useLanguageStore';
import { AIChatMessage } from '../types';
import { COLORS } from '../constants/theme';
import { Send, Bot, User, Sparkles } from 'lucide-react-native';

export const AIFarmingAdvisorScreen = ({ navigation }: any) => {
  const { language } = useLanguageStore();
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: '🌾 Vanakkam! I am your UZHAVAN AI Agricultural Assistant powered by Gemini 1.5. Ask me anything about crop diseases, fertilizers, weather impact, or farming advice!',
      suggestedActions: [
        'How to prevent paddy leaf blast?',
        'Best fertilizer for tomato crop?',
        'Organic solution for stem borer'
      ],
      timestamp: 'Just now'
    }
  ]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim()) return;

    const userMsg: AIChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: 'Now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputText('');
    setLoading(true);

    const aiRes = await farmApi.askAIChat(textToSend, language, 'Paddy');

    const aiMsg: AIChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: aiRes.response,
      suggestedActions: aiRes.suggestedActions,
      timestamp: 'Now'
    };

    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="AI Farming Advisor"
        subtitle="Powered by Gemini 1.5 AI"
        onBackPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.chatScroll}>
          {messages.map((msg) => (
            <View key={msg.id} style={styles.msgWrapper}>
              <View
                style={[
                  styles.bubble,
                  msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
                ]}
              >
                <View style={styles.bubbleHeader}>
                  {msg.sender === 'ai' ? (
                    <Bot color={COLORS.primaryEmerald} size={18} />
                  ) : (
                    <User color="#FFFFFF" size={18} />
                  )}
                  <Text
                    style={[
                      styles.senderName,
                      msg.sender === 'user' ? styles.userSenderText : styles.aiSenderText,
                    ]}
                  >
                    {msg.sender === 'ai' ? 'UZHAVAN AI' : 'You'}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.msgText,
                    msg.sender === 'user' ? styles.userMsgText : styles.aiMsgText,
                  ]}
                >
                  {msg.text}
                </Text>
              </View>

              {/* Suggested Chips */}
              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <View style={styles.chipsContainer}>
                  {msg.suggestedActions.map((chip, idx) => (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => handleSend(chip)}
                      style={styles.chip}
                    >
                      <Sparkles color={COLORS.secondaryGold} size={14} />
                      <Text style={styles.chipText}>{chip}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
          {loading && (
            <View style={[styles.bubble, styles.aiBubble]}>
              <Text style={styles.aiMsgText}>Analyzing crop parameters with Gemini AI...</Text>
            </View>
          )}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask AI about fertilizers, pests..."
            value={inputText}
            onChangeText={setInputText}
            placeholderTextColor="#94A3B8"
          />
          <TouchableOpacity
            onPress={() => handleSend()}
            disabled={loading}
            style={styles.sendButton}
          >
            <Send color="#FFFFFF" size={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  keyboardContainer: {
    flex: 1,
  },
  chatScroll: {
    padding: 16,
    paddingBottom: 24,
  },
  msgWrapper: {
    marginVertical: 8,
  },
  bubble: {
    borderRadius: 20,
    padding: 16,
    maxWidth: '90%',
  },
  userBubble: {
    backgroundColor: COLORS.primaryDarkGreen,
    alignSelf: 'flex-end',
  },
  aiBubble: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  bubbleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 6,
  },
  userSenderText: {
    color: '#E6F4ED',
  },
  aiSenderText: {
    color: COLORS.primaryEmerald,
  },
  msgText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userMsgText: {
    color: '#FFFFFF',
  },
  aiMsgText: {
    color: COLORS.textDark,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 6,
    marginBottom: 6,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primaryDarkGreen,
    marginLeft: 4,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  textInput: {
    flex: 1,
    height: 48,
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
    paddingHorizontal: 18,
    fontSize: 15,
    color: COLORS.textDark,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryEmerald,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});
