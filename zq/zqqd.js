const url = `https://kandian.wkandian.com/V17/NewTaskIos/sign.json?zqkd_param=9NwGV8Ov71o%3DPf4O9CivADHkXPaGV1EWo4AbXe7VHOJ8usKLQLmlRuJ90e8EvkNrqSu5tZejAIVpDLz-3TVNaXJQ5IU4oZCS21z-szdgNLs3CyZ0NxoZOqddwl2qnnwb1zhGKaFtluyQCIqF84gVaBx-QbIaSlixKqdEYvLTrE7oqlVfIUzmA7HHArJvYpNnYbMaxAgu0ejDig45PKnEVhW_4XIi3r7wp0o63MZOkIN7JxoneHBg_xhIF8MF6CiuZTNpFGIVCLC3S8F0KNOez6yPVsJCG5AXnyjJ25WHfBHxKQS5hLJHD86lGLaLIHpGamAhdtBNaQAXoa5j7Fbujk1LlkjUT5LNIppG_2f-smIliB74iEY5CP3iw5tFfyR1uVfWnxuTVrjWfnbp-DTW7n4sWC-BFowduszPa5fy78JB3zWUE8ywdZM1ZI61Y_SwXaJk0iYzIdijv_5D2fLTbfPDSGhE8gLwHAB6xPV7GXBI_Di3VQfEeakQiyr_ENXI7MdgG9s44Ybp4uMhRyMrZ3EV_lMsZ6cJoOQyQy7eqOfBhP-CbFdANHvUqSZZ4HabEmRkhrRbMcGz_cLEf7-U_bKoW8Nyc5IclWa6zZG4Uh-MPYnQ6fhLGFM3N-mlB8ZNdlOEUEyGvcZN7m2_WRJfkqluXBPmCw-rDriQFb27vs3T6WLpg1jrGoZv0iPa8dZ9Ksh2SQ73BCgUjzYmWYLmHpvM-vrffiFfhDul6Ub0tNLR8rYj8SEVkKUhTejcS3K3T8cHBqO22B7ddfln2YZ4JQpgX4E_3Ey24O3HsREd3gSEUZ6Ep7VFGAMZ2D4imGeMJIG9e0hP96bdyr6A-r2zns8n0pafc7nJdvh0hrd7xN96rBsdVf0AiNeViDTZwRV8dKjpByhJyY0KR2qD9eYFE1Od5ifu6SYNKLbiCPy92nJA5jUKg-P83AruFqKfuJAGsWJ70XXfzqexa4B0YwiGk_3nyRrJ_UBJ3oxWY3nh_W-639tIbrAwUBBFDix4tcVCoaWV45iIClOkGZzTvjL_E0Li9iAa9NqU0w6vL6-RKUlZsvXMuecRgoowXl_20-evy_9htdF-I9Q0RFlk_fD5v8QN20jmIllF6cSMYSXaxRtQZlXEFVqXPXQ5W-YWj3q_HN7Ch-SAYrznKFw_91whB4BUqLO6n2EcVP21P1cWUSKVvNBdZt_lIQ6_rrjHyKX47t7D56jhsmXnVMImmGU6Jf_UjNUIr9cxNF5VquY_qmJcg2NqA_HKrB4eIfzXbrAlehl0QQgXNWV2fG-9kx7UenEkokPlgjorQOyk3mvh2myOVC0CfBMR4dtWQ2DjC5tulBMTG-sT3fpnV2fOalt875pL_x7mp6QZBvcHHzv1pSl-BmEVqvD6k1b_EqoLbDuJlEjW0zmRoSTIjeYFcI3rPnItr5mktma_xD6aivHIWBWSqVqQggxzZI0EB-T16dg2U8T5kILqQ9W5rEAuYpQnqaLhCv8itM-EJxQgz32Dg28Bhc7xgiuxkNB5C2Sou2s97z3Va5UomA4mCLRon29keFRlXknOFt3uWKsfh2T_2bbGPpxQEz-JSYJwPjyYuNPuVH_4P2YehflOIo4x5WKwBqFPbJ58fB-wNOs5KwnHbhnszizCAYXAk90bdLOnj7RjvBh1lrHpRj0czwNveuRwSJrtSJZ0VQo4mZdr8S6b7bB9EzSUYzUjInYlMtgF_X1ij-BO9nDI9O8LFgj_5DRl81UmQjZ_MW7y6K-y_RAlvb3NQ1INJt0Eq5IQvws7UFdXO1hCZqzkpJVP1tJ2oovTAUIOAT7FnA04JOpl5c3bP-rIZGaxUxsyCcgOP18jd891mORJpL7egdLeBGouWL8yuUztIqR7opRabdnOFiItPVDXUpl4-zR77roDAxxa5F9abp-I9vTxzVMWyllnXrdF4xZ9p90SeWzPNhn4AWfy2mM4`;
const method = `GET`;
const headers = {
'User-Agent' : `KDApp/2.6.1 (iPad; iOS 15.2; Scale/2.00)`,
'Host' : `kandian.wkandian.com`,
'Connection' : `keep-alive`,
'Accept-Language' : `zh-Hans-CN;q=1`,
'Accept-Encoding' : `gzip, deflate, br`,
'Accept' : `*/*`
};
const body = ``;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    console.log(response.statusCode + "\n\n" + response.body);
    $notify('中青看点','签到','签到成功🥂');
    $done();
}, reason => {
    console.log(reason.error);
    $done();
});
