const express = require("express");
const router = express.Router();
const { ocrSpace } = require('ocr-space-api-wrapper');
require('dotenv').config();
const OpenAI = require('openai');
const openai = new OpenAI({ apikey : process.env.OPENAI_API_KEY });

router.post("/", async (req, res) => {
    const ocrResFront = await ocrSpace(req.body.fronturl, {
        apikey: "c4b7dc7c9e88957",
        OCREngine: 2,
        isTable: true
    });
    const ocrResBack = await ocrSpace(req.body.backurl, {
        apikey: "54457bdeae88957",
        OCREngine: 2,
        isTable: true
    })
    const inData = { 
        front: ocrResFront?.["ParsedResults"]?.[0]?.["ParsedText"],
        back: ocrResBack?.["ParsedResults"]?.[0]?.["ParsedText"]
    };

    // check that front and back are not null
    if (inData.front == null || inData.back == null) {
        console.log("null ocr error");
        res.status(400).json({ error: "Invalid input OCR" });
        return;
    }


    // const testOcrFront = "Pocket\npach\nDo not use if blister is open or the\nwords \"ADVIL SAFETY SEALED\"\nnder blister are missing or torn.\nAdvil\nIbuprofen Tablets, 200 mg\nPain Reliever/Fever Reducer (NSAID)\n10 Coated Tablets\nTablets\nSee new warnings information\nSEALI\nLETY SEALED\nAdvil\nIbuprofen Tablets, 200 mg\nPain Reliever/ Fever Reducer (NISAID)\nTablets\n10 Tablets"
    // const testOcrBack = "Drug Facts\nActive ingredient (in each tablet)\nIbuprofen 200 mg (NSAID)\"\nPurpose\nPain reliever/Fever reducer\n*nonsteroidal anti-inflammatory drug\nUses\n• temporarily relieves minor aches and pains due to:\n" + 
    // "• headache\n• toothache\n• backache\n• menstrual cramps\n• the common cold\n• muscular aches\n• minor pain of arthritis\n• temporarily reduces fever\nWarnings\nAllergy alert: Ibuprofen may cause a severe allergic reaction, especially in people\n" + 
    // "allergic to aspirin. Symptoms may include:\n• hives\n• facial swelling\n• asthma (wheezing)\n• shock\n• skin reddening\n• rash\n• blisters\nIf an allergic reaction occurs, stop use and seek medical help right away.\nStomach bleeding warning: This product contains an NSAID, which may cause\n" + 
    // "severe stomach bleeding. The chance is higher if you\n• are age 60 or older\n• have had stomach ulcers or bleeding problems\n• take a blood thinning (anticoagulant) or steroid drug\n• take other drugs containing prescription or nonprescription NSAIDs (aspirin,\nibuprofen, naproxen, or others)\n" +
    // "• have 3 or more alcoholic drinks every day while using this product\n• take more or for a longer time than directed\nHeart attack and stroke warning: NSAIDs, except aspirin, increase the risk of\nheart attack, heart failure, and stroke. These can be fatal. The risk is higher if you\n" +
    // "use more than directed or for longer than directed.\nDo not use\n• if you have ever had an allergic reaction to any other pain reliever/fever reducer\n• right before or after heart surgery\nAsk a doctor before use it\n• stomach bleeding warning applies to you\n• you have problems or serious side effects from taking pain relievers or\n" +
    // "fever reducers\n• you have a history of stomach problems, such as heartburn\n• you have high blood pressure, heart disease, liver cirrhosis, kidney disease,\nasthma, or had a stroke\nI you are taking a diuretic\nDrug Facts (continued)\nAsk a doctor or pharmacist before use if you are\n• under a doctor's care for any serious condition" +
    // "\n• taking aspirin for heart attack or stroke, because ibuprofen may decrease this benefit\nof aspirin\n• taking any other drug\nWhen using this product\n• take with food or milk it stomach upset occurs\nStop use and ask a doctor if\n• you experience any of the following signs of stomach bleeding:\n• feel faint • vomit blood\nhave bloody or black stools\nhave stomach pain that does not get better\n• you have symptoms of heart problems or stroke:\n• chest pain\n• trouble breathing\nweakness in one part or side of body\n• slurred speech\n•leg swelling\n• pain gets worse or lasts more than 10 days\n• fever gets worse or lasts more than 3 days\n• redness or swelling is present in the painful area\n• any new symptoms appear\nIf pregnant or breast-feeding, ask a health professional before use. It is especially\nimportant not to use ibuprofen during the last 3 months of pregnancy unless definitely\ndirected to do so by a doctor because it may cause problems in the unborn child or\ncomplications during delivery.\nKeep out of reach of children. In case of overdose, get medical help or contact a Poison\nControl Center right away.\nDirections\n• do not take more than directed\n• the smallest effective dose should be used\n• adults and children 12 years and over: take 1 tablet every 4 to 6 hours while\nsymptoms persist\n• if pain or fever does not respond to 1 tablet, 2 tablets may be used\n• do not exceed 6 tablets in 24 hours, unless directed by a doctor\n• children under 12 years: ask a doctor\nOther information\n• read all warnings and directions before use\n• store at 20-25°C (68-77°F)\n• avoid excessive heat above 40°C (104°F)\nInactive ingredients\nacetylated monoglycerides, colloidal silicon dioxide, corn starch, croscarmellose sodium.\nmethylparaben, microcrystalline cellulose, pharmaceutical glaze, pharmaceutical ink.\npovidone, pregelatinized starch, propylparaben, sodium benzoate, sodium lauryi suilate.\nstearic acid, sucrose, synthetic iron oxide, titanium dioxide, white wax\nQuestions or comments? call toll free 1-800-88-ADVIL\nDo Not Use if the sealed child resistant pouch is broken or torn.\nFor most recent product information, visit www.Advil.com\nPfizer, Madison, NJ 07940 USA\n© 2016 Pfizer Inc."

    const promptIntroduction = "Extract medication information from an OCR scan result including front and back scan of a medicaiton. \n\n";
    const promptOutFormat = "Your output should be a JSON object with exactly two fields: one called 'metadata' representing the name and dosage of the medication as well as any relevant information from the front ocr scan, and an 'ingredients_list' field representing the active and inactive ingredients of the medication as well as any relevant information from the back ocr scan. \n\n";
    const promptFrontInEx = "An example front ocr scan result is: \"Extra Strength TYLENOL PM Acetaminophen, Diphenhydramine HCI Pain Reliever, Nighttime Sleep Aid 100 Caplets\n"
    const promptBackInEx = "An example back ocr scan result is: \"Drug Facts (continued)\nWhen using this product\n• drowsiness will occur\n• avoid alcoholic drinks\n• do not drive a motor vehicle or operate machinery\nStop use and ask a doctor if\n• sleeplessness persists continuously for more than 2 weeks. Insomnia\nmay be a symptom of serious underlying medical illness.\n• pain gets worse or lasts more than 10 days\n• fever gets worse or lasts more than 3 days\n• redness or swelling is present\nnew symptoms occur\nThese could be signs of a serious condition.\nIf pregnant or breast-feeding, ask a health professional before use.\nKeep out of reach of children.\nOverdose warning: In case of overdose, get medical help or contact a\nPoison Control Center right away. (1-800-222-1222) Quick medical\nattention is critical for adults as well as for children even if you do not\nnotice any signs or symptoms.\nDirections\n• do not take more than directed (see overdose warning)\nadults and children\n• take 2 caplets at bedtime\n12 years and over\n• do not take more than 2 caplets\nof this product in 24 hours\ndo not use\nchildren under 12 years\nOther information\n• store between 20-25°C (68-77°F)\n• do not use if carton is opened. Do not use if foil inner seal\nimprinted with \"TYLENOL\" is broken or missing\nInactive ingredients carnauba wax, crospovidone, FD&C blue\nno. 1 aluminum lake, hypromellose, magnesium stearate, microcrystalline\ncellulose, polyethylene glycol, polysorbate 80, povidone, pregelatinized\nstarch, sodium starch glycolate, stearic acid, titanium dioxide\nQuestions or comments?\ncall 1-877-895-3665 (toll-free) or 215-273-8755 (collect)\""
    const promptOutEx = "An example output given the example front and back ocr scan results output should be a json object like this: {'metadata': 'Extra Strength Tylenol PM Acetaminophen, Diphenhydramine HCl', 'ingredients_list': 'Acetaminophen(500mg), Diphenhydramine Hci(25mg). Inactive Ingredients: Carnauba Wax, Crospovidone, Fd&C Blue 1 Aluminum Lake, Hypromellose, Magnesium Stearate, Microcrystalline Cellulose, Polyethylene Glycol, Polysorbate 80, Povidone, Pregelatinized Starch, Sodium Starch Glycolate, Stearic Acid, Titanium Dioxide'}"
    const promptEnd = "You should always return JSON as raw text instead of a code block. Under no circumstance are you to not return JSON. Now here is the front ocr scan result: \"" + inData.front + "\" and here is the back ocr scan result: \"" + inData.back + "\". \n\n";
    let prompt = promptIntroduction + promptOutFormat + promptFrontInEx  + promptBackInEx + promptOutEx + promptEnd;

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role:"user", content: prompt }],
        model: "gpt-4-1106-preview",
    })
    const beforeParse = chatCompletion.choices[0].message.content;
    // const beforeParse = "not json lol";
    console.log(beforeParse);
    try {
        aiResponse = JSON.parse(beforeParse);
    } catch (e) {
        console.log(e + " gpt error");
        res.status(400).json({ error: "Invalid input GPT" });
        return;
    }

    res.json(JSON.parse(beforeParse));
});

module.exports = router;