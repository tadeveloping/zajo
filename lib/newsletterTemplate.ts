import type { NewsletterContent, NewsletterProperty } from "@/types";

const LOGO_B64 = "iVBORw0KGgoAAAANSUhEUgAAAJAAAACMCAYAAACTUiBYAAA4CUlEQVR4AezBCbzfdXXg/c855/v/3zUrYQ8YAoQAsohli4IaSCAkYQuIWFCQQK21nam1fWY6a5+q1Zlptc+MOjUotiogexYW2UkIVBCVmz1kuwRCCElIbpa7/H/fc578Ot55Ze5cst2AgPf9loigX799pfTr1wdKv359oPTr1wdKv359oPR727g77s77WaLffhUReM6IKqpKyd2JCMyM95tEvz6LCNwdEUFVsZQoLV+2LLpqXRx//AnCDhGBu6OqiAjvB4l++yQicHdEBFXFzCi9snp1/OzhnzFzxgyeffYZarUaEyZcFDfeeBMf/8QnxMwoFUWBmSEivJcl+u2xiMDdKZkZZkbptddei0cfeYTp0+/j2WefYd26dYgIqoqIcOedd3Dfffdy1tljYuoNU7n0ssukoaGBUs4ZEUFVeS9K9NuliMDdKZkZZkZp3bp18fjjjzH9vvuYO/dpXnvtNUQEVSUiSClx8sknA8KvfvVLiqJg7tNzmDP7KY7/xgnxmWs/w+9fcw2HHHKosIO7ExGYGe8lEhH0+z9FBO5OyczotmHDhnjyySeZft+9zJ79FGvWrKFkqhS5IKUKxxxzLOPGjWPyxRfzkY98VERg+n3T4+abp/H003Po6urCzKjVahx++OFcccWVfO5zN3DiBz8o7BARuDuqiojwbicRQT+ICNydkpnRbdOmTTF79lNMnz6dJ594nFdeeQV3JyWjKDJmxlFHjeT888dx8SWXMGbMGGlqaqI3Tz/9dEyb9j0euH8Wb775JtVqlVqtxoABA7nwwguZeuNNjB07VviNoigwM0SEdyuJCH5XRQTuTsnM6LZ16xbmzJ4TM2ZM57HHHqO1dRXuTkpGUWRUlQ984AOMHXsel1x6KR/5yEdl4MCB9LR58+YYNGiQsENEICKUli5ZErf88BZ++tPbebm1lUqlQs6ZlBJnnXU2U6feyKWXXSaNjY2Ucs6ICKrKu41EBL9LIgJ3p2RmdGtvb2fu00/H9BnTeezRR1mxYjk5Z8yMnDOqyvDhR/Cxj32MSy+7jHPOOZchQ4YIPWzYsCGeeupJZs6cyZzZszlu9Gg+/wefZ8JFF0lKiZ2tX/9G3HbbbfzjD3/IvHktlEQEd2f06OO59jOf4ZprruHQQw8TdnB3IgIz491CIoL3u4ggInB3Ukp06+rq4tlnnonp0+/j0Ucf4aWXXqIoapgl3J3SYYcdzjnnnMOll17Gxz7+cYYNGyb0sGHDhnjqqSeZOXMmc2Y/xerVq8lFpr6hns7OTsyMD33oNK677jo+edWnGDJkiLCTrq4uZs6YETffPI05c+bQ1dmBpUStVuOwww5nyhVX8LnP3cBJJ50k7BARuDuqiojw2yQRwfuVu+PupJToVhQFz/385zF9+n08/PDDLF26hM7OTlJKuDsRwaGHHsqYj3yESy65lLFjz+Pggw8WenjzzTfjqaeeZMaMGcx+6klWr15NzhlVxd1pbGykUqkQEWzZ0kYEiAgjR47kU5+6ms989jqOPvpoYYeIQEQozZ37dNw8bRr33z+LjRs3Uq1WqNUKBgwYwPgLLuDGG2/ivPPOF36jKArMDBHht0EigvcTd8fdSSnRzd35xS+ejxkzZvCzhx5i0aKFdHR0kFLC3YkIDjroIM4eM4bJky9h3LhxHHbYYUIPGzdujNmzn2LmjBnMmTOb1taXyblAVXF3qtUqI0aMYNLkySyYv4BHH3uMI48YzsWXXMJ9997LqlWtqAruwUEHHsikyZOZeuONnHnmWcIOEYGIUHrppaVxyy238NPbb6e1tZVKJZFzJqXEmWeexQ1Tp3L55ZdLY2MTpZwzIoKq8k6SiOC9zt1xd8wMEaHbL3/5y5g1ayYP3H8/CxcuYPv27aSUCHeyO8OGDeOss85m0uSLGT9+PEceeaTQw6ZNb8bs2bOZOWMGTz31JK2tL5NzgYjgHtTX13HMMccyduxYJk2azBlnnikDBgzgS3/6r+Ob3/p7TjxhNPMXLJL169+IH/3ox/zoR//IgvnzyTkTAc3NTZx77seYeuONTJw4SVJK7GzDhvVx++2388NbbqGl5UVKIkJ2Z/Rxo7n2M5/hmmuu4bDDDhd2cHciAjPjnSARwXuRu+PumBkiQreWlpZ44IH7uX/WTFpaWti2bRspJSKCnDNDhgzljDPOYPLFFzN+/HhGjjxa6OHNN9+MOXNmM3PGDGbPnk1r6ypqtQIV8ICGhnpGjTqO8847j4mTJnHWWWdLfX09JXcnIviTP/5ifOe7/5PjR4/imWd/zuDBg4UdOjs7mD59enz/5puZO3cuHR3tlFJKnHrqh7juuuv55FVXMXToUGEntVqNWTNnxrSbv8ec2bPp7OzALFGr1Tj00MOYMmUKn7thKieffLLwGzlnVBUR4e0iEcF7hbvj7pgZIkK3hQsXxoMPPMD998/kV7/6FVu2bCElIwJyzgwaNIgPf/j3mHzxxVxwwYWMGjVK6GHTpk0xd+7TzJg+nSeffJLW1lXUagUiEAGNjY2MHn0c550/jokTJ3HmmWdKtVqlW86ZkrtTqVT44h99Ib79ne9y/OhRPPf8C9LU1ERRFFQqFbrNnj07bp72PR588EE2btyIKjsIR40cyaeu+hSfve56jj76aKEUgPAvnnnmmbh52veYdf8sNm7YQLVaoVYraG4ewLjx47npxps4f9w44TeKosDMEBH2N4kI3s3cnXBHVFFVui1dujQeeuhBZs2cyQsv/ILNmzdjZohAUWQGDBjAqad+iMmTL+bCCRM44YQThB42bdoUc59+mhkzpvPU7KdoXbWKzs4aIvyL5uYmRo8+nnHjxzPxoomcfvrpkioVuuWcKakqIkKpKApSSnzxj74Q3/7Odzl+9Ciee/4FaW5uJiIo5ZwxM0SE0uLFi+OWW37AnXfcwcsvtyKABxx44IFMmjyZqVNv5KyzzhJ2iAhEhNKyZS/FD2+5hdtvv53W1lWklMg5k1LijDPO5IYbpnL5lCnS1NREKeeMiKCq7C8SEbzbRATujoigqnRbuXJlPPjgA8yaNZPnn3ueN9/ciJkhIhRFQXNzMyeddDITJ01i4kUTOenkk4UeNm/eHM/MncuMGdN58sknWLVqFZ2dNUoiMGBAMyeeeCLjx1/AhIsm8uEPf1jMjG5FUSAiqCoiQk9FUZBS4ot/9IX49ne+y/GjR/Hc8y9Ic3MzEYGIUHJ3cs6oKmZGad26dXHbbbfyT//4j8yfP4+cMxHQ1NTIued+jBtvuomLLpoolUqFnW3csCFu/+nt/PCWW3jxxV9TEhFydo477jiuvfYzXHPtNRx++HBhB3cnIjAz+koigneDiMDdERFUlW6rV78cP/vZz5gxYzrP/fznrF+/HjNDRCiKgsbGRk784AeZMOEiJk+ezCmnnCqqys42b94cc+fOZebMGTz15BOsXLmSjs4aAojAwIEDOemkkxh/wQVcNOEiPnTaabID3YqiQERQVUSEXSmKgpQSX/yjL8S3v/Ndjh89iueef0Gam5uJCESEjRs3xtChQ4UdIoKiKBARUkqUOjs7mTF9etx88zTmPjOX9u3tiEBKiVNOOZXrrrueqz71KYYOHSrspFarcf/9s2LatO8x+6mn6OjoIKVErVbjkEMPZcrlU/jcDTdwyimnCvuJRATvNmvWrIlHH3mE6dPv49lnn+WNN9YhIqgqRVFQX1/PCSecwAUXTmDy5Is57bTTJKXEztraNsczzzzLrJkzeOKJx1mxYgUdnTVKKjB48GBOPvlkLrjwQiZMmMApp5wq7KQoClQVEUFE2FNFUZBS4ot/9IX49ne+y/GjR/Hc8y9Ic3MzRVGQUuKPvvCH0dr6Ml/6sy8xdux5wm/UajVKlUqFbnPmzI5p06bx0IMPsGHDRlQhAkaOPJqrPvUpPvvZ6zjmmGOEHSICEaH0z//8bEybNo1ZM2ewYcMGqtUKtVpBc3Mz548bz0033cQnPjFWzAwRYV8lfssigtIbb7wRjz/2KPfddx9z5z7N2rVrERFUlYigWq1y3HGjGT9+PJMvvoTTTz9dqtUqO2tra+OZZ56JWTNn8MQTT7By5QraO7ooqcCwA4ZwyimnMmHCBC648EI++MGThJ0URYGqoqqklHi7FEXB/Q88wONPPMoZp58ZN9wwlcsuv1yam5spFUVBRJBS4pxzzpVzzjmXxYsXxw9v+QF33HkHL7e2snLFcr721a8y7Xv/wKRJk+OGqTdy9tlnCztEBGeddbacddbZLF+2LH74jz/k9ttuY+XKFXR0dDBzxnTuuutuPv8HN8Z3/+f3xN1RVfZF4rfI3VFVXn755fjEx8+ltbUVM0NEiAhSqnDssccybvx4Jk++mDPPPFMaGhrYWVtbG//8z/8cs2bN5PHHHmP58uV0dHZRUoEDhx3AaaedxoUXTuCCCy/k+OOPF3ZSFAWqiqqSUuKdICKYGQOaB/Dss88we/Ycvv71v4lrr/0M11x7LcOHDxd+w92JCEaPHi1f/8Z/4c++/Odx26238o//9EPmz5vH+vXrueWWW7jjjjs499xzY+qNNzJx4iSpVCqUjj7mGPnrv/4Kf/qnX4o7fno7t9xyC/Pmt1BasWIFfZV4F+js7GTNmjWUVJWjjhrJuHHjmHzxJXzkIx+RhoYGdrZlyxaeffaZmDVrJo8//jgrli+nvaOLkgocfNAwPvzh32PChIsYf8EFjBo1SviNiCDnjKqiqqSU+G3IOePuNDc3IyKsWrWSf/uXf8l//+9/z+WXT4nP/+EfcsIJJ8oOqCruTkRw4IEHyp/8q3/FH3z+88yYMT2+f/PNzJ37NNu2beOhhx7k0Ucf4eRTTonrPns9V3/6aoYMGSpFUTB06FD5/B9+gak33sSDDz4Q3/rWt6hUqkQEfZF4Vwg+8IEP8Imx53HJJZfy0Y9+VJqbm9nZ1q1befbZZ+P++2fx+GOPsWzZS7R3dFFSgUMPOZjTT/89Jlw0kXHjxnH00ccIvxER5JxRVVSVlBLvFu5Oqb6+nsbGRrZv387/+PZ3WLlyJbPufwB3R0RQVUoRgXumrq6OK6/8pFx55SeZM2dO3Dztezz44INs2LCBX77wAr94/gW+8Y2/4c677o7TTz9Dcs6UUkpMnnyxTJ58MatWrQp2UFX2VeK3SFUpHXHEkfLc8y8wcOBAuuWccXdSSnz72/8jvvXNb/LKK6vp7CoomcLhhx3K6WecwcSJEzn//PMZMeIo4TcigpwzqoqqklLi3czdcXdSStRVE9Vqld6ICGaJiMDdUVXOOeccOeecc1iyZEnccssPuOvOO2lr28zLq1/l1Vdf5YwzhJKZERG4O6rKiBEjhD5KvAvU19dTX19PzpmSqmJmlESExx55mOUrVnLA0MEc1NjIWWedzUUXTeS888/jiCOOFH7D3XF3VBVVJaXEe01EUBQFEcGuiAhmRsndiQiOO+44+frXv8HYsWPjkosnU1dNVCtVdiYimBkld0dV6YvEu0REYGb0ZsCgQZgqhxxyCA899DDDjzhC+A13x91RVVQVVeV3japSqtVqqCoNDQ2ICDlnIoK3oqr0VeJdQkR4K+5OdqepuZnhRxwh7k7OGTNDVVFV+oGqYmbknHmnJN5D3J2iKEgpISKICP3+byLCO0V5jxER+r17JPrI3Xm7uDsiQkTQb9+4O+6OuyMi9KSq9EWiD9wdVeXtoqqUUkr023sRQUNDA6qKqtIbd0dV2VeJfZRzxsy47957Y9rN02hqbMTd2Z8iAjOlpaWFaiXh2Xk/EBFUFVVFVdmZqqKqiAh91dzczFe+8tdMm/YPkd0RhJKqsm37dm6ceiOXXnaZ5JwxM/ZFYh+4O2bGT37y47jmmmt5uzU3NWCmRATvB11dXbg77e3t1Go1dpaSUSuczs5O9pW7097Rhaoye87TvJUHHniQH//4R/H7v3+NuDuqyt5K7CV3R1V59tln4mtf+yqnnHwS1WoF9wBh/4pARHj99ddZt24dCO8Lhx12GEcfPZIhgwdR5MzOTJW2ti0ceeSR7KumpiZGH3csjY2NIIKI8H8IUBW6ump87WtfZeTIkXH22WPE3VFV9kZiL6kqpZNPPkV+/esWzAx35+2Qc8bM+Oxnr41bb70dM+O9zMwo/dVf/b/yn/7zX7ErIkJJVdlTZkbp9NPPkHnzF7I7qkrOma6uLkqqyt5K7KOmpia6qSpvB1VFVRER3k/UDGXfRQS7k1JiT6gqlUqFiKAkIuyNxC5EBBHBW4kI+kqAAEQEEWFn7o6IsKcigj0lIvy2uDsRgYgQEexMRIgIRARVpVtEkHNGVVFV9jcRoRTuZHfMDBFhdxK7ICKICL8tIoKIsKdEhPcCVWVvRAQiQkqJUmdnJ52dnbh7sJ+ICHV1dVJfX09SpRQRiAi7kuhFzhkz4+GHH46/+Zu/YdDAAeSceTuIQK1WMHToUL437WZpamoiIhAR9lTOGTPj77/1zfinf/oRgwcPJOdMT2bGps1tfPnLX+bqqz8tOWfMjHeKu2Nm/N3f/m3MnDWLQQMHkHNmZ6rK1q1bGTNmDH/9la+Ke0bV6Orq4nvf+4eYOXMGa159lfb2dnJ2ROizAFSEhobGOPzww5k0eTI33fQHUldXR0QgIryVRC8igtIrr6zmySefpL6uQlGr8XYQFWpFcMhBwyiKIgBhL4kIpYceepBf/upXNNRXyTnTU0rG9vYuHn3kEa6++tNEBO+kiKDU0vIiTz75JPV1FYpajZ1ZSnR2FVQqFUoR0NbWxhVTLo9HHn2MSlIqlQoigoiwv0QEEcHSpUt4+JFHufeeu+Ouu+9l8ODBwg4iQm8Su1CtVjEzBg0aRFEUvB1EhK6uLgYOGoTswF6KCFSV9vZ2Xn75ZQY0N1BXV4+705Oa4b6FZcuWUTIzfhsaGxsxMwYNGkRRFOzMzNi0aRNNTU2UzIyvfvUr8cijj3HwQcMoioKIICJ4OzQ0NJBS4oknZ/P//MWfM+3m7+PuiAi9UXYhIsg5k3Mm50zOmZwzOWdyzuScyTmTcybnTM6ZnDM5Z3LO5JzJOZNzJudMzpmcMzlncs7knMk5k3Mm58zuqCo9RQSl1tbWePXVVzFLFEWBu+PuuDvujruTi4JKpcLKlSvZsGFDiAgRwTvN3ck5k3Mm50zOmZwzOWdyzuScyZ4ptbW1cfddd9Lc1EBXVxc5Z9ydiCAiiAgigoggIogIIoKIICKICCKCiCAiiAgigoggIogIIoKIICLIOdPV1cWQQQO45567ebm1NVQVd6c3ynuEqtLR0UFPEUFp8eJFbNmyFTPjrUQEKSXWr1/H8uXLKLk770bhQWn5smXx+uuvU6lUiAjeCRGBmrFp02Z+/eKvKUU4vVHeJSICVaU3KSXcnVGjRqGqRDgiQikiKM1racEDRIRdMTPaO2osWLCAUkTwbhQEpU2bN9PV1YWI8E4SETxg/RtvUIqgV4ldEBHMDFVF1dhzgYgQEbg7u6KqdHR2cdLJJ9PU1IS7o6rs7PXXX+eccz7K979/i/AvhG6qSmne/HmoQESwJ+a1tNBv93LO7EpiF2q1GjlntmzZQlEU7C1VpaGhEQjeiojg2fnklZ9ERMg5o6qUVJWI4MorrmTKFVcycOBAIgIRoRQRqCq1Wo2lS5ZSV1chItiViCCZsHDhAkpmxvuBuxMR7A0zo68SvRARSocccghnnnkmgwcNJOfMngoCFWHr1m0sWDAfVaU3IkJnRwfDDz+U8RdcSMnM6CYilD53w1Rhh4hAROgWEYgIr776Srzyymqq1Toigl1xd+rq6li+fDlbtmxhwIABRAQiwntRRKCq3Hb7HRx55BG4OyLKW4kIVITt7du5+lNXsW7dOiqVChHBvkj0wswoTZhwkUyYcBH76uabp8WNN97EsAOGUBQFPZkZmza3cfkVVzBs2DDJOWNm9OTuiAgiws4igtKSJUvYvHkzgwYNIufMrkQElUqF119fy6pVK+Okk06WiEBEeC87+eSTGT58uLCH3DOVSiV2oC+U3YgIIoKIICKICCKCiCAiiAgigoggIogI3J2I4LZbb6WSlIigNxGBiHDFlCuJCN6KqiIi9BQRlObNm0eRAxFhT6SU2LqtnUWLFlFyd97rtm/fjrtTFAXujrvj7rg77o674+7knHF3tm3bRkTQV8puiAgigoggIogIIoKIICKICCKCiCAiRASqyuLFi+IXv3iepqYmcs70JCJ0tLdzzNEj+fgnPiE7oKrsDRGhNK+lBRGICPZUBMxraeH9QlVRVVQVVUVVUVVUFVVFVVFVVBVVRVXZH5T9zN0p3XffvbRt2UZKid6YGdvaO7nwwgk0NzeTc0ZE2BtmhruzeMliqpVERLAnIgJTYf78+ZRUlX77RtnPzIycMzOmT6eumnB3euPuVCuJKVdcwb6ICEqvr10bL7e2UldXR0SwJyKCarXCSy+9RGdnJ6pKRNBv7yn7Uc4ZEeGXv3whXnyxhcbGRtydnlSV9vZ2TjjxBM4662yJCFSVveHulF566SU2btxISomIYE+4O3V1daxZ8yqrV78c7BAR9Nt7yn4UEZTuuedu2js6MTN6o6q0d3QxedJkqtUqOWdEhL0REZTmz59PVy2jquwpEcHMaGtrY8niJZQign57T9lPIoKUEp2dHdw/axYN9VXcnd7knGlqrOfyy6dQEhH2lgj/omXeiwh7TkQoioJShNAyr4VSRNBv7yn7ibtTmjt3bixevISGxkbcnZ5UlW3btvOh007j5FNOkYjAzNhbqkZp0cKFVCqGu7M7IoK7Y5b46R138sEPnsDzz/2ckoiwv6kq73fKfnb3XXdRFBkVoTeqSlet4NJLLkVVyTmztyICEWHDhg2xatUqqtUqEcHumBmb27by53/xF5x33vkyaNAgli5dSkRgZkCwv0QE7o6Z8X6m7AcRgZmxZcsWHn74ZzQ21pNzpjdFUWPwoAFccumllFSVvRXulJYvX8Ybb7xBpVIhItgVEaG9vZ1jjj6KP/njP5FaVxdr177OokWLeeWVV4Id3IO+UlUigj/90p9xwvGjWb9+PWbG+5WyH+SciQgef/yxWLFyFfX19UQEPZkZW7du5+wxYzjmmGPF3VFV9pZHUFqwYAHtHV2YGbtjZmzb3sFnr7ue5gEDeOLJJ2Lt2rX8l//6XxkyZIhEBCJCX6kqEcExxxwjP3v4YU4//Qy2bdsWvE8l9gMRQUS46647IYK3IiIU2bn8simU3B1VZV/Na2lhT4gIXV1dHHzQMK6//nN0dnby7LPP8tDPHmbMmDHCfqaquDvDhx8hP73jTkSEkojwfqP0UURgZrzxxrp44vHHaWpqxN3pSUTo6urk4IOGMXHiREpmxr4wM0oLFiwgmeIRvBUzo66ujrYt2/jkVVdx+OGHS3t7e3zxi3/MmDFjZF5LS3zlK38d7ODu7C+qSkTQ0NBAfX0971eJPso5k1LiwQcf5NU1axl2wBCKoqAnVWVzWzsTJkzk0MMOE3dHVdlbEYGIsGXLFpavWE5dXZVwpycRobR58yaKDEMGD+JLX/oyOWcGDx4s7PD0nDnx6U9fzbBhw/h3/+7fIyLsTyJCRCAivF8l+khVKd1zz92YKRFBr0SICKZMuYKIwN1RVfZWRCAirFy5Il5fu5ZqtUpEsDNVpaurCwKmTLmSkUcfzUUTLmLEiBHCDu3t7XzjG1+Pv/vb/0ZXVw0zZcOGDTFs2DCJCESE/UVEeD9L9IG7o6q0trbG3KefprmpAXenJxGhs6ODDxx5BOPGj0NEMDP2hbujqixauIht29sZOqSenAu6qSodnZ00NzXz45/cytlnny2NjY2oKu7OL3/5y7hx6g38+sUWBg8awIABVdauXcvyZcsYNmwYEYGI0G/PKH3g7pRmzpzB+g1vUqlUiQh6MjO2bWtn3LjxDB48RHLOiAh90dLyIhEgwv8mIrg71UqVH/34x4wbN07Wrl0bq1atjFqthqpy260/4dcvtnDIwQfyvwgdnTUWLFxAyd3pt+cSfWBmQHDfvfdSSUZE0JuIwEyZcsUVRAR9oaqU5s+fj6kQEXRTVd58cxOf/OQnGT/+AokIjjnmGGGHnAtKW7duxVSp1WrsbF5LC/32nrKP3B0RYdHCRfH888/R1NRIzpmeRJT29nZGjTqWc8/9mOyAqrIvIgJVpaOjg2XLXqKurop70M3dGTCgmSeeeJzvf//m2LJlCzln3B0RpfTGG28ATjf3oJKUBQsXUDIz+u05ZR+5O6V777uXti3bSCnRGzNle3snF100kYaGBoqiQETYFxFBqbW1NdasWUO1WiXC6RYRqCpFUTB16o184xtfDzPD3RERShs3bsTMiAhKEU61WmXF8uVs2dKGiBAR9Nszyj4yM3LOzJgxnbpqwt3pjbtTX1fh8ilXUBIR9lVEUFqyeDFtbVswM3oSETZu3MTll1/GF7/4x0QEqoqIUBQFmzZtwszoFhFUq1Vef/11Vq5cGewQEfTbM4l9kHPGzHjhhRei5cUXaWxsxN3pSVXZvn07J510EqeffrpEBGbGvooISi3zWvAAEWFnZsbGjZv4y7/8t3zlq18TdogIRITS1q1bo61tM2ZGRNDNzNi0uY1FixZx8smn4O6oKv12T9kHEUHpnrvvor2jCzOjN6pKR2eNiy++hJQSOWf6QkQozZ/XggpEBN1SMjZs3MSXv/xnfOWrX5OcM+6OiBARlLZs2cK2bdtQVXqKgHktLfTbO8peighSSnR0dPDAA/fTUF8l50xviqJgQHMjl152OSVVZV9FBGZGUdRYsmQp1WqFiKBkZrS1beXjHzuXr3/jv0jOGVVFVSm5O+7O2rVr2bp1K2ZGRNAtIjAV5s+fT0lV6bdnlL3k7pSemTs3Fi9eQkNjIxFBT2bGtu3b+b3TT+fEE0+UiEBV2VcRQenVV1+NV15ZTV1dHRFByd1RVf7m619HVSmJCN1SSqgqqkLOGRFhZxFBXV2FZcteoqOjA1UlIui3e8o+uuvuuyiKjIrQGxGhVstcdulliAg5Z/oiIigtXbKETZs2k1IiIjAztm7dxkc/+lHOOutscXfMjFJEUFq0aGHMa2mJD3/49+Scc85h8+Y2zIxu7k6lUmXNmjWsXv1ysENE0G/3lL0QEZgZbW1tPPyzh2hsrCfnTE8iQq1W44Chg5l88SWUVJW+iAhK8+bPp8iOiFASEWpFZvwFF1Byd3YWERxwwDCWLV/GL37xfPzD926mqamJWq2GiNAtpURbWxuLFy+mFBH02z1lL+SciQgef/yxWLmylfr6eiKCnlSVrdu285GPfpQRI0aIu6Oq9IWIUJrX0oIIRASliKBaSZxyyimURIRuIoKIcNBBB8lll10ubW1tjDjqKJk27Wa2bt2GqtJNRMgO8+fNoxQR9Ns9ZS+ICCLC3Xfdxa6ICDk7U6ZcQcnd6Sszw91ZvHgR1UoiIijlnBGCESOOoiQi9OTuuDvHH38C//k//ocQVRoa6nF3ukUEKjBv3jxKIkK/3UvsoYjAzFi3bl088cTjNDU14O70JCJ0dnZy+GGHMOHCCZTMjL6ICESEdetej9bWVurq6ogIVJVNmzczdepURo4cKe6OqtKTiCAiNDQ08K1vfZMtW7dzwNDB5JzpFhFUqxWWLl1CURSklOi3e8oeyjlTeuihB3l1zVrq6uqICHpSVbZt284nxo7lwIMOkpwzIkJfuDull156iQ0bNpJSQlVpa9vC1Vd/mn/4h2nCDqpKRNBTRBARFEXB+Asu4KADD2Dbtm2oKt0igmq1yurVq3nttdeCHdydfrum7CFVpXTP3XdhJkQEb024YsoVRAQRQV9FBKUF8+fTVStQVUSEnJ0jjjiCUkrGyy+/HCKCuxMRRAQlVUVEGDZsmNx11z2yaPFSzjzzLLZt246qUooIUkq8+eabvLR0KaWIoOTuFEVBURQURUFRFBRFQVEUFEVBURTknPldlNgD7o6q0traGnPnPk1zUyPuTk8iQkdHByNHjmDseefLDpgZ+0tLSwvdiqJg4MBmvvud77B0yZKoq69n7NixXHfd9aSU2Jm709XVxbZt22L9+vWsX/8GAwcOICIQEbqpKrXCmb9gPmPPO4+IoKSqqCr9/m+JPeDuqCozZ85g/YZNDDtgCEVR0JOZsW17B+MvuJABAwaQc8bM6Cszo7Rw0UKqFcXdKYkIRDBjxn0UGR584H6+8+1vx6DBg6ikRK1W0NnZQWdnF52dHWzZspWtW7fQ1tZGSommpkZyzuxMgJaWFkoRQWnOnNnx83/+OQ0N9bgHOxMRurq6OHz44Vx11aeE3zGJPWBmRMB9995DJRkRQW/cnUrFuOKKK9lfIgIRYePGjbFy5Uqq1Toigv9NhEGDBiMiFEXBokUL8ZwJQAREFBFBVVFVzIyBAwdScnd25u5UKsbiRYuICESE0r133803//7/wxSy838QIIDTTjuVq676FBGBiPC7IrEb7o6qsnDhgnjuuedpamok50xPqkp7ezvHjx7NmDFjhB1Ulb6KCESE5cuX88a6ddTX1xMR7CznTLfGxkZKIkJE0C3YIYKSu9ObiKCuro7W1lWsX78+DjzwQGGHpuZmUkoMO2AIRVGwM1Vl65YtDBkyhN9Fym64O6V7772XLVu3kVKiN6pKe0cXEydNpq6ujqIoEBH6yt0pLVy4gPaOLsyMXXF33J2cM+6Ou+PuhDsRQUTwViKCSqXC+vXrWbbsJbq5O0VRUBQFRVFQFAVFUVAUBUVRUBQFOWd+Fym7YWbknJk5Yzp11YS705ucMw0NdUyZMoWSiLA/tbS8yDtBVenorLFwwQL67Z6yCzlnRIQXXvhFtLS00NjYiLvTk6qyfft2PnTqqZx66ockIjAz9gczo7Rg/gKSCRHBO2HevHn0273ELkQEpbvvvpv2ji6ampooioKeVJXOroKLL7kUM6MoClJK9FVEICJs3bqV5SuWU1dXh7vTG1VFRNhT7k5E0JO7U0nKgoUL6Ld7ibcQEaSU6Ojo4IH7Z9FQXyXnTG+KomDQwGYuvfQySqrK/hARiAgrV66M19eupVKpEBH0JCK0t7fT2dnFnmpsbKBSqRAR7CwiqFarrFi+go0bN8bQoUMlCPr1LvEW3B0zY+7TT8eSJUsZMKAZd6cnM6OtrY1PfGIsxx13nLg7qsr+4O6oKosWLWTrtu0MHTKYnDM7ExG6umqceOKJjBp1HO6OiPBWgkBF+cUvnmfNmjVUKhUigm4RQbVa5fXX17Jy5QqGDh1KeNCvd4nduPvuuyiKjKri7vQkItQK57LLLycicHdUlf0lIpjX0kIEiAg9mRnbtrfxr//0S/z+718j7KEvf/lL8bd/+02GHVBPURTsTNXYvr2DRQsX8eEP/x4eQb/eJXoREZgZbZs3x8MP/4zGxnpyzvQkInR1dXHgsKFMmjQZEUFViQhE6CNBVRAR5s+fj6kQEfTk7tRVE0cecSQ5Z9wzqsZbKYqClBJHjzyatyICAbTMa+F/CXYnIiiKgohAROhNzpmIICLY33LO5FzgHkQEbyUiEBFyzsF+oPTC3Sk9NfspVq5qpb6+noigJ1Vl27btnHf+OIYPHy7soKqICCCAAAIIIIAAAggggAACCCCAAAIIJVWjVquxdOlS6uqquDs7ExGKomDgwIF8YMQIzAyzhJlhZpgZZoaZYWaYGSklzIxjjj2WZIq701NEYCosmD+fkoqyKxFBSomUEpVKhZQSKSVSSqSUSCmRUqKuro6UEnV1dexvgwcPxixRqVQwM8wMM8PMMDPMDDMjpYSZMXDgINmBvkr0IiIobdy4EfdAROiNu9PY2MCvf/VLzvnoRwICEWF/CECArlqN115bQ7VaJSLYmYhQq9U48sgjOeTgg4UdRIRdERFKI0YcxYABzeScUVUigm7uTl1dlWXLXqKUKhXeSkRQqVR4/fXX+cEPvh9EgAi9cXdMjYULF1JXreDu9JWIEBF8+ct/xqCBA8PDEYRdEihqNTZv3oyZERHsq8QumBm7EhGklFi9ejUrVqzg7SAiNDQ00BsRoVarccQRR1KtqyMiEBF2RUQoHXbYYXLggQfGq6++SrVapadqtcqaNWtYv3591FWrvJWIoK6+ntZVq7jhhqnsicaGOhobG3B39pdbf/ITPNhjAgwc2Iyq0heJXYgIdiciqFar1NXV8XZxd3ojIhQ5OPqYYyjlnEkpsSsiQkTQ1NTE8OHDWblyJXV1dUQE3SICM2PT5i0sWrSQSrXKrkQEKSWGHTCEPZFzJiLYn4YMGYyIsKcigpwzfZXYDyKCiOC3ZdSxx7I33B0zY+TIo3niiacQVXBnZyJCaf68eVSrVXYnIiiKgv0iIFmilJKhquxOzpm3Q0NDA7uivIdFBKbCMcceS0lE2BMRQemYY48lAOH/FhGU5s2fxyGHHMI7RURwhIMPPpjSoYccSmNjI+6Zd1JEUK0YI446ipKI0BvlPSznTHNzEyNGHEVJRNgbo449FhWICHqKCKoVo+XFFj74wQ/S1NiA58zbTVWJCM4992OURhx1lJxwwgls395BSol3gpnR3t7OyJEjOe20D0tEoKr0RtkFEcHMMDPMDDPDzDAzzAwzw8wwM8wMM8PMMDPMDDPDzDAzzAwzw8wwM8wMM8PMMDPMDDPDzDAzzAwzw8wwM8wMM8PMMDNSSrg7Bx50EIcffriwg4iwJ1SV0lEjj6a5uRERwcwwM8wMM0NVaWpq4qWXlnLE8CO4/vrr2bipjWq1QkoJM8PMMDPMDDPDzDAzzAwzw8wwM8wMM8PMMDPMDDPDzDAzzIyUEtVqlXVvbODUU07i4ksuEXcnpcS/+Td/SVetoKOjg5QSKSVSSqSUSCmRUiKlREqJlBIpJVJKpJRIKZFSIqVESomUEiklUkqklEgpkVIipURKiZQSXV1dbG/v5D/8x/9EY2Mj7o6I0JvELnR1dZFzZtOmTRRFwbuJmdFVy4wePYSBAwcSEYgIe0JEKA0fPpyUqqzf8CbJhIhgZ2ZGVy3z8+d+zn/9b38ra9asiXvuvY+SKfuVOwRw0kkf5Ec/vpWmpibcHXdn4qRJcssPfhD//t//JWvWrCV4+whw2GGH8s1v/j2f/vTvi7tjZryVRC9EhNKRRxzJeeedx6CBA8g5826iqmzZspWx542lFBGICHtCRCgNHTpUrrrqqli1ahV1dXVEBDszMza3baG9vZ36+nruvudeefDBB+Phnz3Eyy+/TM4FIPRNoKocdNDBjBnzEaZccYU0NTUREagqJXfnuuuvl0mTJ8VTTz7FSy8tpb29HVGFCPpMhHCnvr6BY0eN4uMf/xjDhh0o7o6qsisSEfTbvYigJCK83dwdVWVnOWfMjHdKzhkzY3cSuxARRATvdqrKvnJ3dkdEEBFKOWciAlVlf4oIIgIzQ1XpycyICNydiODtIiKoKmbGnkjsgoggIryfqSp7w8z4bRERzIx3E6Vfvz5Q+vXrg8TbLOdMRNAbEcHM2BV3x93pjZkhIuxORJBzpqSqqCp7wt1xd0QEM2NPRQQ5Z0pmhojQm4gg58xbERHMjN5EBDlnSqqKqtIt50xEICKYGW+nxNvMzOgLVUVV6QsRIaXE3lJVVJW9JSKklNgdESGlxL4QEVJK9MbMeKck3ma3/uTHsfqVV6ivq0NEAKHU2dnJaR8+jfPOO18iAhFhZ+6OqvL003NizpynaWyoBxFKKkJnZydXXHklI0YcJRGBiNBTRCAivPnmm/GDH3yf7dvaGTPmbM47/3xxd1SV3rg7qsqjjz4Szz//C4YPP5xrr/2MsBsRgYiwYsXyuPOOO6hUq1xzzTUcdNDBEhGICKWIQER47bXX4rbbbiWZ4RG4OwKklOjo6GTUcaO45JJLJSIQEUoRgYiwdu3a+MlPfkxXV41JkyZx0kknSc4ZM+POO++IZcuWM2LEB7j66k9LRCAivB0Sb5OIQET4u7/7/9uD29g67/KAw7/7/j/n+DVtHdfFrRfbabp6LQ5NW9usrp2EkDZOO7kvoALbWvYJIbF9gHbSNm37QkGiUDZW9QUoIEAgoXasWwujiYZGK1GykTg4OY6T2HGCmyqLYzd+O8f2Oc99L4+QpSyyEyfRcRfJ1/U0u/fsZSHpVGD3nh5vbl4vZoaqMs/MUFVee+01vvSlp1DA+L9+/+abaWxci5kRQuBcZkYIgZ6ePTzxxF+SuG/7Nj68dSvgLMbMUFVe+tGP+MaL32J98y08+uhjXIiZEUIgk8nwV3/9NyQ2b97Edde9D3dHREiYGSEEBgcHePzxJ1jM5k0beeCBBzEzQgicraSkhK98+SlO/M8Ib789zLPPPoeIMDk5yeOf+yzDb7/Dpz/9KT7xiT8mjmOiKKIYIops9erVlJakaWq6mQ0bNuDA6KlT7Nq1i4mJCU6cOEFz83rcnYVUVFQQRRE3XP8+brvtNlQDqsr09DR1db9HQkRYiLuT6MtkiKKIq1ZVcPz4cebm5kin07g7IsJiKletIooiqqpWczHS6TSlJSkqKiqIohTnEhESNTU1bO/aRmlpCceO/ZYjRwYpLy+npaWFXG6Gzs5OEiLCPBEhjmOqqqrkIx/5qH/9G9+kZ89u8vk8qVSKvT09PjY2RmVFGX/6J4+SEBGKJaLI3GFmdo672tt5/vmvC2fs3r3b727/Q1SVKIo4H3enUChw9dVX88q/viqqyrlUlYWICIne3l7iQgF3Z3h4mOHhYV+3bp24OyLCYsyMQqFAHMdcDHenUChQKBRwd86lqiSamv5AfvrvPyPxj//wVf/s5x6ntraWl17+saTTaeapKmdzdxJbt97DCy+8QH9/P/39B7y5eb384hf/yXR2hub338rtd9whnKGqFIuyTPL5PHEcE8cxU1NTiAjujruzFO5ONpvFzIjjGDPD3TkfVcXd6TvQR2lpmsrKSsbHJzh06CAJd+e9Njc3h5mRz+dJuDvZbNbNDDNjISEEEp0bN1Jfv4Z3T0/wq7feQkR44803SGzctJHy8nLiOEZEKBZlmYgIqoqqIiJcCjPDzDAz3B0RYTHujogwOjrqhw4eZE19PR0dHcTmZDIZEu7Oe01VUVVEhHmqKqqKiLAQESE2o7q6Wu66qx1E2PVfu5icnGRfby+qQlfXdhLuTjEpy0hEEBGiKOJiqSpXXXUVURSRSqUIIXA+ZkbiyOAgI6fGWNvYyN0dnSQy+/eTEBGuVG6Gu7NtWxe405fJ8Oqr/+YnT45QX7+Gjo4OEiEEiilimYgIuVyOXC7np0+fJooi4jjGzFiK6elpvv+973pJaSmzs7M0NjbS2blR3B0R4VzuTqLvQB+JhoZGNmzYQKK//wBmRgiBK5WqIiJ8aMsWqldfw+DgIP/0ta9hDu3t7VRVrRYzQ1UppohlsmrVKr7w5Of9uedfYFVlOdlsDnOoqKjgfNydxNjYGI998s+Yd+89W3l9x07MjBACi9m3r5dEQ2MjTU1NlJeVMDQ0xIkTJ/yGG24Qd0dEuNKoKmbGmjVrpK3tg75z5w4KhQICdHVtx90xM1SVYlKWiWqgUCjw7rvvMjc3R3d3N1/84he4884WcXdCCJxPaWkpmzd1snXrFtraWmltbSUhIiwkhEAik8mQaGhooLr6WqmtrWXk1CgDA4dJmBlXKjMjsa2ri0LsiAjXXruaLVs+jIigqhRbxDJxM+7v7ubpp79KNpvj808+SXPzejEzRITFiAiJ6upqfvb6TikpKeFsqsq53B0RYWJ83AcHBgiq3HTTTYgIN954I0eGjtGXybBx4ybcnSuVqpLYdu82qldfw/j4BPfffx91dXViZqgqxaYsk6npKdrb75Z169YyMTnFiy9+EzPDzFiqOI5xd8yM83F3EkeGhjh+/DjV1VWUpEsYGxvzuro6Evv27yMhIlypRIREfUOD1NZeTyE2PvCB20iYGcshYpnMzs4SQuCee+7l4KEBdu7YQTabpbKyEndHRLgQd2eeuyMiLMTMUFX6+jLkZuaorHS6u/8IESGfz5NOBfbv209CVVkKd+dsIsL/F+6Ou/NeUJaJiJB46KGHKStNc/jwAD//+X/4GcRxzFKoKiKCqiIiXEhvby8JM2NiYoLx8XFyuRzpdJqjR4cYHR11EcHduRARQUQQEUSEFb8TsUyCBhJ3tbfLLbfc6nt69vLySy/R3f0AIsJS5PN5UqkU7o4AIQRElXOpKon+AwdIPPDgg/zd3/49if6D/Xz8Y48wMjLCkSODVFdXY2aEEFiMuzMzM8M8EaGkpIQVEFFkqkoIAQ1KoqysjO3bt7N372948803GDl50muuu07MDFXlXCJCCIGxsTE2b+p0ESUE5fTpCZ555hm2dXVJHMeEEEi4O6rKzMwMR48OoRpoubOFxrVrhTOuramhpqbGh47+lv7+flpb23B3FhNC4NixY7S1triqMjMzQ2NjI6++9hNJpVK4OyLC2USEEAIhBESEpRARQgiEELgUIQRCCKgqy0kpsqmpKeI4JpudZt5DDz+MiHP02DA//OEPSJgZC8nlcsRxzOjoKXr29rKnZy///es9HB4YYHR0lN9x5rk7icOHDnkmk8Espr6+ATMjn89TXl7ONddUEccxb/3yl5xPNpsljmNGRkbYtz/Db3r3cfDQYTKZDO7OYvL5PLNzBU6fHqdQKLAUs7OzxHHM+Pg4fgYXwd0ZHx8njmNyuRzLKaJIRITEU1/+CiMjJ2loaGTe7bffIa/v2OmTk1PU168hEULgbCEEEo899kna2j5IOp1CEBIiwlw+T0tLCwnVwDwRIVF7fS0v//OPCSFwd0cHqooAosqzzz3HO++8Q11dHYkQAmcLIZD4zJ//Bdvvu590OgUIIhDHMRUVlURRREJEmKeqJFpb23jllX8hChHr1t1EQkRYSAiBxCOPfIxb399MZWUFFRUVwhkiwvmICImysjK+/Z3vMDk5RVNTE4kQAstB3J0VKy5VRJHFcUxCRFBV5sVxTEJEUFUWY2a4OwtRVUSEhbg7ZkZCVRER5pkZ7o6IoKosxsxwdxYSQmAx7o6ZkVBVRIQLMTPcnUQIgYsVxzEJEUFVWS4RRRZCYCEhBJZCVbkUIkIIgYWoKkuhqlwKESGEwMVQVS5HCIH3grJixWVQVqy4DMqKFZdBWbHiMvwvHG1W92sT5+cAAAAASUVORK5CYII=";

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=360&fit=crop",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=360&fit=crop",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=360&fit=crop",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=360&fit=crop",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=360&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=360&fit=crop",
];

const TIP_ICONS: Record<string, string> = {
  rada: "&#128161;",
  novinky: "&#128240;",
  trh: "&#128202;",
};

const TIP_LABELS: Record<string, string> = {
  rada: "REALITNÁ RADA",
  novinky: "NOVINKY Z TRHU",
  trh: "POHĽAD NA TRH",
};

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeHtml(s: string): string {
  // Allow only <strong>, <br/> — strip everything else
  return s
    .replace(/&/g, "&amp;")
    .replace(/<(?!\/?(?:strong|br)\b)[^>]*>/gi, "")
    .replace(/&amp;(?=(?:strong|br))/g, "&");
}

function buildPropertyCard(p: NewsletterProperty, idx: number): string {
  const img = p.imageUrl || PLACEHOLDER_IMAGES[idx % PLACEHOLDER_IMAGES.length];
  const badgeHtml = p.badge
    ? `<tr><td style="background:${p.badge === "ZNÍŽENÁ CENA" ? "#1C1917" : "#E0882C"};padding:6px 18px;height:28px;line-height:1;"><span style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:9px;font-weight:800;color:#FFFFFF;letter-spacing:2.5px;text-transform:uppercase;">${esc(p.badge)}</span></td></tr>`
    : `<tr><td style="height:28px;padding:0;font-size:0;line-height:0;">&nbsp;</td></tr>`;

  const meta = [p.area ? `<strong>${esc(String(p.area))}</strong>` : null, p.rooms ? `<strong>${esc(String(p.rooms))}</strong>` : null]
    .filter(Boolean)
    .join("&nbsp;·&nbsp;");

  return `<table cellpadding="0" cellspacing="0" border="0" width="274" height="100%"
    style="background:#FFFFFF;border-radius:8px;overflow:hidden;border:1px solid #E3E1DC;box-shadow:0 2px 12px rgba(0,0,0,0.07);height:100%;">
    <tr><td style="padding:0;line-height:0;"><img src="${esc(img)}" alt="${esc(p.title)}" width="274" height="180" style="display:block;width:274px;height:180px;object-fit:cover;border:0;"/></td></tr>
    ${badgeHtml}
    <tr><td style="padding:16px 16px 8px 16px;">
      <h3 style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#1C1917;margin:0 0 7px 0;line-height:1.3;">${esc(p.title)}</h3>
      <p style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:19px;font-weight:800;color:#E0882C;margin:0 0 8px 0;line-height:1;">${esc(p.price)}</p>
      ${meta ? `<p style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;color:#888888;margin:0 0 6px 0;">${meta}</p>` : ""}
      <p style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;color:#888888;margin:0 0 0 0;">&#128205; ${esc(p.location)}</p>
    </td></tr>
    <tr><td style="height:100%;padding:0;"></td></tr>
    <tr><td style="padding:12px 16px 20px 16px;">
      <a href="${esc(p.url)}" style="display:inline-block;background:#E0882C;color:#FFFFFF;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:9px;font-weight:800;letter-spacing:1.5px;text-decoration:none;padding:8px 16px;border-radius:3px;text-transform:uppercase;">Zobraziť &#8594;</a>
    </td></tr>
  </table>`;
}

function buildGrid(properties: NewsletterProperty[]): string {
  const rows: string[] = [];
  for (let i = 0; i < properties.length; i += 2) {
    const left = properties[i];
    const right = properties[i + 1];
    rows.push(`<tr><td style="padding:0 20px 14px 20px;">
      <table cellpadding="0" cellspacing="0" border="0" width="560"><tr>
        <td width="274" style="vertical-align:top;padding-right:6px;height:1px;">${buildPropertyCard(left, i)}</td>
        <td width="274" style="vertical-align:top;padding-left:6px;height:1px;">${right ? buildPropertyCard(right, i + 1) : ""}</td>
      </tr></table>
    </td></tr>`);
  }
  return rows.join("");
}

export function generateNewsletterHTML(content: NewsletterContent, recipientEmail: string): string {
  // VERCEL_URL is auto-set to the current deployment's domain (where /logo-v2.png actually exists),
  // so the logo URL stays valid even before the branch is merged to main.
  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || vercelUrl || "https://zajo-five.vercel.app").replace(/\/$/, "");
  const logoHost = (vercelUrl || appUrl).replace(/\/$/, "");
  // Gmail proxies external images — must use an absolute hosted URL on a domain that actually has the file
  const logoSrc = `${logoHost}/logo-v2.png`;
  const unsubscribeUrl = appUrl
    ? `${appUrl}/odhlasit?email=${encodeURIComponent(recipientEmail)}`
    : `/odhlasit?email=${encodeURIComponent(recipientEmail)}`;
  const tipIcon = TIP_ICONS[content.tip.type] || "&#128161;";
  const tipLabel = TIP_LABELS[content.tip.type] || "TIP";
  const count = content.properties.length;

  return `<!DOCTYPE html>
<html lang="sk">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${esc(content.greeting)} — ZAJO Reality</title>
</head>
<body style="margin:0;padding:40px 0;background:#ECEAE5;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#ECEAE5;padding:40px 0;">
<tr><td align="center">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:600px;box-shadow:0 4px 32px rgba(0,0,0,0.10);border-radius:12px;">

<!-- HEADER -->
<tr><td style="background:linear-gradient(90deg,#E0882C 0%,#C97520 100%);border-radius:12px 12px 0 0;padding:20px 32px;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
    <td style="vertical-align:middle;">
      <img src="${logoSrc}" alt="ZAJO Reality" width="144" height="140" style="display:block;width:72px;height:70px;border:0;"/>
    </td>
    <td align="right" style="vertical-align:middle;">
      <span style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:rgba(255,255,255,0.90);letter-spacing:0.5px;">${esc(content.month)}</span>
    </td>
  </tr></table>
</td></tr>

<!-- HERO -->
<tr><td style="background:#FFFFFF;padding:44px 32px 44px 32px;">
  <table cellpadding="0" cellspacing="0" border="0">
    <tr><td><p style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:10px;font-weight:800;color:#E0882C;letter-spacing:2.5px;text-transform:uppercase;margin:0 0 18px 0;">&#9632;&nbsp; VÝBER DOPORUČENÝCH NEHNUTEĽNOSTÍ</p></td></tr>
    <tr><td>
      <h1 style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:34px;font-weight:800;color:#1C1917;margin:0 0 8px 0;line-height:1.15;letter-spacing:-0.5px;">${esc(content.greeting)},</h1>
      <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;"><tr><td style="background:#B8860B;height:2px;width:48px;border-radius:1px;font-size:0;line-height:0;">&nbsp;</td></tr></table>
    </td></tr>
    <tr><td><p style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:15px;color:#555555;line-height:1.8;margin:0;max-width:460px;">${safeHtml(content.intro)}</p></td></tr>
  </table>
</td></tr>

<!-- TIP -->
<tr><td style="background:#FFFFFF;padding:32px 32px 36px 32px;border-top:1px solid #E3E1DC;">
  <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;"><tr>
    <td style="padding-right:10px;vertical-align:middle;font-size:18px;line-height:1;">${tipIcon}</td>
    <td style="vertical-align:middle;border-bottom:2px solid #E0882C;padding-bottom:2px;"><span style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:10px;font-weight:800;color:#E0882C;letter-spacing:2.5px;text-transform:uppercase;">${tipLabel}</span></td>
  </tr></table>
  <h2 style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:20px;font-weight:800;color:#1C1917;margin:0 0 14px 0;line-height:1.3;letter-spacing:-0.2px;">${esc(content.tip.title)}</h2>
  <div style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:14px;color:#555555;line-height:1.85;">${safeHtml(content.tip.body)}</div>
</td></tr>

<!-- PROPERTIES HEADER -->
<tr><td style="background:#F7F5F1;padding:28px 32px 16px 32px;border-top:1px solid #E3E1DC;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
    <td>
      <p style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:10px;font-weight:800;color:#E0882C;letter-spacing:2.5px;text-transform:uppercase;margin:0 0 4px 0;">VÝBER NEHNUTEĽNOSTÍ</p>
      <h2 style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:20px;font-weight:800;color:#1C1917;margin:0;letter-spacing:-0.2px;">Najnovšie ponuky v Trenčíne</h2>
    </td>
    <td align="right" style="vertical-align:bottom;"><span style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;color:#888888;">${count} nehnuteľnost${count === 1 ? "" : count < 5 ? "i" : "í"}</span></td>
  </tr></table>
  <table cellpadding="0" cellspacing="0" border="0" style="margin-top:12px;"><tr><td style="background:#B8860B;height:2px;width:40px;border-radius:1px;font-size:0;line-height:0;">&nbsp;</td></tr></table>
</td></tr>

<!-- GRID -->
<tr><td style="background:#F7F5F1;padding-bottom:12px;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    ${buildGrid(content.properties)}
  </table>
</td></tr>

<!-- CTA -->
<tr><td style="background:linear-gradient(135deg,#E0882C 0%,#C97520 100%);padding:40px 32px;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td align="center">
    <h2 style="font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:22px;font-weight:800;color:#FFFFFF;margin:0 0 10px 0;line-height:1.3;">${esc(content.ctaText)}</h2>
    <p style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:14px;color:rgba(255,255,255,0.85);margin:0 0 24px 0;line-height:1.65;">Máme stovky overených ponúk v Trenčíne a okolí.<br/>Zavolajte nám alebo prezrite celé portfólio.</p>
    <a href="${esc(content.ctaUrl)}" style="display:inline-block;background:#FFFFFF;color:#C97520;font-family:'Montserrat',Arial,Helvetica,sans-serif;font-size:11px;font-weight:800;letter-spacing:1.5px;text-decoration:none;padding:14px 36px;border-radius:3px;text-transform:uppercase;">Zobraziť všetky ponuky</a>
  </td></tr></table>
</td></tr>

<!-- FOOTER -->
<tr><td style="background:#FFFFFF;border-top:1px solid #E3E1DC;padding:24px 32px 30px 32px;border-radius:0 0 12px 12px;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr><td align="center" style="padding-bottom:14px;"><img src="${logoSrc}" alt="ZAJO Reality" width="96" height="94" style="display:block;margin:0 auto;width:48px;height:47px;border:0;"/></td></tr>
    <tr><td align="center" style="padding-bottom:14px;">
      <p style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:12px;color:#888888;margin:0 0 4px 0;line-height:1.9;">ZAJO Reality s.r.o.&nbsp;&nbsp;·&nbsp;&nbsp;Trenčín, Slovensko</p>
      <p style="margin:0;">
        <a href="mailto:zajac@zajoreality.sk" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:12px;color:#E0882C;text-decoration:none;">zajac@zajoreality.sk</a>
        <span style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:12px;color:#E3E1DC;">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
        <a href="https://www.zajoreality.sk" style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:12px;color:#E0882C;text-decoration:none;">zajoreality.sk</a>
      </p>
    </td></tr>
    <tr><td style="border-top:1px solid #E3E1DC;padding-top:14px;">
      <p style="font-family:'Inter',Arial,Helvetica,sans-serif;font-size:11px;color:#BBBBBB;margin:0;text-align:center;line-height:2;">
        Tento email bol odoslaný na adresu <span style="color:#888888;">${esc(recipientEmail)}</span>.<br/>
        <a href="${unsubscribeUrl}" style="color:#888888;text-decoration:underline;">Odhlásiť sa z odberu</a>&nbsp;·&nbsp;
        <a href="https://www.zajoreality.sk/gdpr" style="color:#888888;text-decoration:underline;">Ochrana osobných údajov</a>
      </p>
    </td></tr>
  </table>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
