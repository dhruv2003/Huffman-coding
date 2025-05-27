from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .serializers import HuffmanInputSerializer, HuffmanResultSerializer
from .utils import get_huffman_encoding

class HuffmanEncodingAPI(APIView):
    """
    API endpoint for Huffman encoding.
    """
    
    @swagger_auto_schema(
        request_body=HuffmanInputSerializer,
        responses={
            200: openapi.Response(
                description="Successful Huffman encoding",
                schema=HuffmanResultSerializer()
            ),
            400: "Bad Request: Invalid input"
        },
        operation_description="Encodes text using Huffman coding algorithm and returns the encoding details"
    )
    def post(self, request, format=None):
        """
        Encode text using Huffman coding.
        
        Returns the original text, frequency table, Huffman codes, encoded text,
        and compression statistics.
        """
        serializer = HuffmanInputSerializer(data=request.data)
        
        if serializer.is_valid():
            text = serializer.validated_data['text']
            
            # Process the text using Huffman coding
            result = get_huffman_encoding(text)
            
            # Serialize the result
            result_serializer = HuffmanResultSerializer(result)
            
            return Response(result_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
