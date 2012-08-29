var __submitted = false;

function populateTranslationOptions() {
    var translationOptions = ["Egyptian Hieroglyphs",
    						 "Al Bhed (Final Fantasy X)", 
    						 "Futurama"];
    
    $.each(translationOptions, function(index, value) {
        $("#translationOptions")
            .append($("<option></option>")
                    .attr("value", value)
                    .text(value));
    });
}

function getFormValues()
{
	$('#toBeTranslatedForm').submit(function() {
		__submitted = true;
		var __textAreaValue = $('#toBeTranslatedTextArea').val();
		var __selectValue = $('#translationOptions').val();
		outputTranslated(__selectValue, __textAreaValue);
		return false;
	});
}

function outputTranslated(a, b)
{
	$('#translatedArea').slideDown();
	$('#translatedInto').text('Translated Into ' + a);
	$('#translatedText').html(a + "<br />" + b);
	
	if (a == 'Al Bhed (Final Fantasy X)') 
	{
		conversionAlBhed(a, b);
	}
	if (a == 'Egyptian Hieroglyphs') 
	{
		conversionEgypt(a, b);
	}
	if (a == 'Futurama')
	{
		conversionFuturama(a, b);
	}
}

function conversionAlBhed(a, b)
{
	var alphaEnglish  = "abcdefghijklmnopqrstuvwxyz";
	var alphaAlBhed  = "ypltavkrezgmshubxncdijfqow";
	var string = b.toLowerCase();
	
	function encode(string, alphaEnglish, alphaAlBhed) {
		var newString = "";
		stringArr = string.split("");
		for(i in stringArr) 
		{
			if (stringArr[i] == ' '){
				newString += '<span id="break"></span>';
			}else{
			index = alphaEnglish.search(stringArr[i]);
			newString += alphaAlBhed[index];
			}
		}
		return newString;
	}
	
	$('#translatedText').html(encode(string, alphaEnglish, alphaAlBhed));
}

function conversionEgypt(a, b)
{
	var string = b.toLowerCase();
	stringArray = string.split("");
	
	var output = '';
	$.each(stringArray, function(index, value){
		if (value == ' ')
		{
			output += '<span id="break"></span>';
		}else{
		output += '<img src="/images/FunTranslator/egypt/' + value + '.png" class="imageLetters" />';
		$('#translatedText').html(output);
		}
	}); 
}

function conversionFuturama(a, b)
{
	var string = b.toLowerCase();
	stringArray = string.split("");
	
	var output = '';
	$.each(stringArray, function(index, value){
		if (value == ' ')
		{
			output += '<span id="break"></span>';
		}else{
		output += '<img src="/images/FunTranslator/futurama/' + value + '.png" class="imageLetters" />';
		$('#translatedText').html(output);
		}
	});
}


$(document).ready(function() {
	populateTranslationOptions();
	getFormValues();
});