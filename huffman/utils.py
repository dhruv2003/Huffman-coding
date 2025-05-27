import heapq
from collections import Counter, defaultdict

class HuffmanNode:
    """Huffman tree node representation."""
    
    def __init__(self, char, freq):
        self.char = char
        self.freq = freq
        self.left = None
        self.right = None
        
    def __lt__(self, other):
        """Less than comparison for priority queue."""
        return self.freq < other.freq

def build_huffman_tree(text):
    """
    Build a Huffman tree from input text.
    
    Args:
        text: Input text string
        
    Returns:
        The root of the Huffman tree
    """
    # Count frequency of each character
    frequency = Counter(text)
    
    # Create a priority queue of Huffman nodes
    heap = [HuffmanNode(char, freq) for char, freq in frequency.items()]
    heapq.heapify(heap)
    
    # Build the Huffman tree
    while len(heap) > 1:
        # Get the two nodes with lowest frequency
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)
        
        # Create a new internal node with frequency equal to the sum
        # of the two nodes' frequencies. The character value doesn't matter
        # for internal nodes, so we use None
        internal_node = HuffmanNode(None, left.freq + right.freq)
        internal_node.left = left
        internal_node.right = right
        
        # Add the new node back to the heap
        heapq.heappush(heap, internal_node)
    
    # The last node is the root of the Huffman tree
    return heap[0] if heap else None

def build_huffman_codes(node, code="", codes=None):
    """
    Build the Huffman codes from a Huffman tree.
    
    Args:
        node: Current node in the Huffman tree
        code: Code string built so far (0 for left, 1 for right)
        codes: Dictionary to store character-to-code mappings
        
    Returns:
        Dictionary mapping characters to their Huffman codes
    """
    if codes is None:
        codes = {}
        
    if node:
        # If this is a leaf node with a character, store its code
        if node.char is not None:
            codes[node.char] = code if code else "0"  # Special case for single character input
            
        # Traverse left (adding 0 to the code)
        build_huffman_codes(node.left, code + "0", codes)
        # Traverse right (adding 1 to the code)
        build_huffman_codes(node.right, code + "1", codes)
            
    return codes

def encode_text(text, codes):
    """
    Encode text using the provided Huffman codes.
    
    Args:
        text: Input text string
        codes: Dictionary mapping characters to their Huffman codes
        
    Returns:
        Encoded binary string
    """
    encoded_text = ""
    for char in text:
        encoded_text += codes[char]
    return encoded_text

def get_huffman_encoding(text):
    """
    Process text using Huffman coding and return all relevant data.
    
    Args:
        text: Input text string
        
    Returns:
        Dictionary containing:
        - original_text: The input text
        - frequency_table: Character frequencies
        - huffman_codes: Character to code mapping
        - encoded_text: Binary encoded output string
        - compression_stats: Statistics about compression
    """
    if not text:
        return {
            "original_text": "",
            "frequency_table": {},
            "huffman_codes": {},
            "encoded_text": "",
            "compression_stats": {
                "original_size": 0,
                "compressed_size": 0,
                "compression_ratio": 0
            }
        }
    
    # Count character frequencies
    frequency_table = dict(Counter(text))
    
    # Build Huffman tree
    huffman_tree = build_huffman_tree(text)
    
    # Generate Huffman codes
    huffman_codes = build_huffman_codes(huffman_tree)
    
    # Encode the text
    encoded_text = encode_text(text, huffman_codes)
    
    # Calculate compression statistics
    original_size = len(text) * 8  # 8 bits per ASCII character
    compressed_size = len(encoded_text)
    compression_ratio = (original_size - compressed_size) / original_size * 100 if original_size > 0 else 0
    
    return {
        "original_text": text,
        "frequency_table": frequency_table,
        "huffman_codes": huffman_codes,
        "encoded_text": encoded_text,
        "compression_stats": {
            "original_size": original_size,
            "compressed_size": compressed_size,
            "compression_ratio": round(compression_ratio, 2)
        }
    }
