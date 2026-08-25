/**
 * 连击音效管理器
 * 根据连击数播放不同的音效
 */

class AudioManager {
    constructor() {
        this.audioContext = null;
        this.comboAudioMap = {
            1: 'First blood',
            2: 'Double kill',
            3: 'Triple kill',
            4: 'Quadra kill',
            5: 'Penta kill',
            6: 'Unstoppable',
            7: 'Godlike',
            8: 'Legendary'
        };

        this.wrongAudioMap = {
            1: 'Welcome',
            2: 'Welcome again',
            3: '优雅，永不过时',
            4: '优雅，永不过时'
        };

        this.consecutiveWrongs = 0;
        this.lastPlayedCombo = 0;
    }

    // 初始化音频上下文
    initAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return this.audioContext;
    }

    // 使用Web Speech API播放音效
    playSpeech(text, callback) {
        if ('speechSynthesis' in window) {
            // 取消当前正在播放的语音
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 1.2;
            utterance.pitch = 1.0;
            utterance.volume = 0.8;

            utterance.onend = () => {
                if (callback) callback();
            };

            utterance.onerror = () => {
                if (callback) callback();
            };

            window.speechSynthesis.speak(utterance);
        } else if (callback) {
            callback();
        }
    }

    // 播放连击音效
    playComboSound(comboCount) {
        if (comboCount <= 0) return;

        const soundText = this.comboAudioMap[comboCount] || this.comboAudioMap[8];

        // 避免重复播放相同音效
        if (comboCount !== this.lastPlayedCombo) {
            this.lastPlayedCombo = comboCount;
            this.playSpeech(soundText);
        }
    }

    // 播放答错音效
    playWrongSound() {
        this.consecutiveWrongs++;
        const soundText = this.wrongAudioMap[this.consecutiveWrongs] || this.wrongAudioMap[4];
        this.playSpeech(soundText);
    }

    // 重置错误计数
    resetWrongCount() {
        this.consecutiveWrongs = 0;
    }

    // 重置连击播放状态
    resetComboState() {
        this.lastPlayedCombo = 0;
    }
}

// 创建全局音效管理器实例
const audioManager = new AudioManager();
