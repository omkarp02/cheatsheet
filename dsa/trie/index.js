                            
// Node structure for Trie
class Node {
    constructor() {
        this.links = new Array(26);
        this.flag = false;
    }

    containsKey(ch) {
        return this.links[ch.charCodeAt(0) - 'a'.charCodeAt(0)] !== undefined;
    }

    put(ch, node) {
        this.links[ch.charCodeAt(0) - 'a'.charCodeAt(0)] = node;
    }

    get(ch) {
        return this.links[ch.charCodeAt(0) - 'a'.charCodeAt(0)];
    }

    setEnd() {
        this.flag = true;
    }

    isEnd() {
        return this.flag;
    }
}

// Trie class
class Trie {
    constructor() {
        this.root = new Node();
    }

    insert(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            if (!node.containsKey(word[i])) {
                node.put(word[i], new Node());
            }
            node = node.get(word[i]);
        }
        node.setEnd();
    }

    // Returns if the word
    // is in the trie
    search(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            if (!node.containsKey(word[i])) {
                // If a letter is not found,
                // the word is not in the Trie
                return false;
            }
            // Move to the next node
            node = node.get(word[i]);
        }
        // Check if the last node
        // marks the end of a word
        return node.isEnd();
    }

    // Returns if there is any word in the
    // trie that starts with the given prefix
    startsWith(prefix) {
        let node = this.root;
        for (let i = 0; i < prefix.length; i++) {
            if (!node.containsKey(prefix[i])) {
                // If a letter is not found, there is
                // no word with the given prefix
                return false;
            }
            // Move to the next node
            node = node.get(prefix[i]);
        }
        // The prefix is found in the Trie
        return true;
    }
}

// Main function
function main() {
    const trie = new Trie();
    console.log("Inserting words: Striver, Striving, String, Strike");
    trie.insert("striver");
    trie.insert("striving");
    trie.insert("string");
    trie.insert("strike");
    
    console.log("Search if Strawberry exists in trie: " +
    (trie.search("strawberry") ? "True" : "False"));
    
    console.log("Search if Strike exists in trie: " +
   ( trie.search("strike") ? "True" : "False" ));
    
    console.log("If words in Trie start with Stri: " +
    (trie.startsWith("stri") ? "True" : "False"));
}

// Execute main function
main();
                            
                        