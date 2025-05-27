from rest_framework import serializers

class HuffmanInputSerializer(serializers.Serializer):
    """
    Serializer for Huffman encoding input.
    """
    text = serializers.CharField(required=True, help_text="Text to encode with Huffman coding")

class CompressionStatsSerializer(serializers.Serializer):
    """
    Serializer for compression statistics.
    """
    original_size = serializers.IntegerField(help_text="Original size in bits")
    compressed_size = serializers.IntegerField(help_text="Compressed size in bits")
    compression_ratio = serializers.FloatField(help_text="Compression ratio in percentage")

class HuffmanResultSerializer(serializers.Serializer):
    """
    Serializer for Huffman encoding result.
    """
    original_text = serializers.CharField(help_text="Original input text")
    frequency_table = serializers.DictField(
        child=serializers.IntegerField(),
        help_text="Frequency of each character in the text"
    )
    huffman_codes = serializers.DictField(
        child=serializers.CharField(),
        help_text="Huffman code for each character"
    )
    encoded_text = serializers.CharField(help_text="Binary encoded text")
    compression_stats = CompressionStatsSerializer(help_text="Compression statistics")
