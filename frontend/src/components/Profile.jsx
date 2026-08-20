import React, {useState} from 'react'
import Navbar from './Shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
const skills = ["JavaScript", "React", "Node.js", "CSS", "HTML"]  

function Profile() {
  const isResume = true;
  // why did we use this open state?
  // because we want to open the dialog when the user clicks on the edit button
  // and we want to close the dialog when the user clicks on the close button
  // so we need to manage the state of the dialog
  // we can use useState hook to manage the state of the dialog
  const [open, setOpen] = useState(false);
  const {user} = useSelector(state => state.auth)

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-24 w-24'>
              <AvatarImage src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAogMBEQACEQEDEQH/xAAbAAEAAwADAQAAAAAAAAAAAAAABQYHAQIEA//EAEEQAAEEAQEFBQUGBAENAAAAAAEAAgMEBREGEiExYRNBUXGBFCJCkfAHIzJiocEkUrHhghUWFzVDU3OSorLC0fH/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAwQFAQIG/8QAMhEAAgIBAwIDBgUEAwAAAAAAAAECAwQRITESEwVBUSIyYaGx8BRxgZHBIzPR4UJD8f/aAAwDAQACEQMRAD8A3FAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAdHSNbpqQNToNTzTk42kdtUOnKAIAgCAIAgCAIAgCAIAgCAIAgOrnAacUOamWbUfayIWyQ7OQNlc3UG1Yad0dWs4E+ui0KcBvexkcrNODU2HXTjrwWeSkLtJtHWwkYaSJbTxqyEHu8T4BWMfGnc9uCnl5cMeO+79DObuTtZSx21uUveeDWjk3oB3LcrphVHSKPmL77Lp6ze5YcTXv4qJlvI5OXH1TxbCTvvf0DDroqN0qrX0VQ1frwaOPC6hdy6fSvTl/sStbbam+z2csUscJ0DZTx9SByUEvD7FHVbv0LcPF6nPSSaXqWiGVk0bZYnh7HDUOadQQqLTT0ZrRkpLVH0XDoQBAEAQBAEAQBAEAQBAee7ahp1ZbFh27FGNXFeoxc5KK5PFlka4ucuEUelnJ8ztXQEmrKzJHdnDrwHuO0J8StSzGjTjy836mBVmzycyHlH0/RmS5nHmplchSe3QRWJYwPy7xA/TRXapKUIv4I0pvRtGz5DbKGhsvj7TN2W9brMdHH3A6cXHoDqsivFdlsovhEl+Uqq01y+DPGSW8pf1PaWbc7vNzj9egWz7FUNeEj5+UZ2z05kyzGWnspqxu5czOnvO11irdOrvrgqft5Xwh9S3pDD49qfyRDusWslcDpHSWLMp0A5l3kPBXIxhVD0Rm2Oy6er1bZY4NmI6lR17aG6ylWaNS3eGo8yeGvQaqjZn9T6aVqzSx/CHp1XPT4IjP9JOGw0zKuCxtiaoJNZZpHkFw7ywH99FHLDtu9qx7mtTCuiPTWtjTcZfq5KjDcpSiWCZu+xw8OvgVmyi4txfKLSep61w6EAQBAEAQBAEAQBAEBTclmBmLWZxNfQxwVXFn55GnU/I6D5q9XS6lC1+b+Rl3XrI7tMfJfMpWIuNqZanZcfdZK0k692v8A6K1r4dVUomHjS7dsJvy+/wCTj7UMSam05tMb91djEmunxj3XfoGn1VTAs6qul+RvZa0l+ZGRMfewMXZRuksUZuy3GDVzopDq3z0fvD/EFPqq7Xrw/qirNd2Gq5X0ZPTzx7IVDTqua7OzM/iZ26EVWn4G/m/++CginlT6pe4uPie3pjR0j775+BD4PH3MzfFamwukPF8jidGDxcfrVW7bYVR6pFGFE7Z9MS927WH2Ax+6xvtWTlZwHxP6n+Vv1xWV/VzJavZGvXXThx0W8n+5le0OYyOfuCfIzGRwP3UTfwM17mt+iVp11QqjpE892U3uT2zX2Z5LLNbYycpx9U/AW6zO9Ph9ePRVb82ENobstQg2tzWNmtnqOzlA1MeZyxz99xllLtXd5A5D0AWXbbK2XVInS0WhMKM6EAQBAEAQBAEAQBAeHN2JKmKt2IW70kcLnNHXRSUxUrIxZBkTlXVKUeUjKtmr4o7R1JpXfdyOMMu93hw01+ehW5lV9VLS8tz57An0XRb89v3PFm6hx2Ut0pBwjkIbr3tP4T8iFJRYp1xkR309FkoMt+Rg/wA7thIp4fvL1LifEubwcPVvH5LMi/w2To+H/Jta/iMbVcr+Ck7N5J+HykV1hcWgbsgbxLmHnp1HAjyWjfT3YOJm1ZHasUvI+L8RkbG0BxrXe1W5X77ZieErTx7TXw04ryroRp69NEvvQtSqlKfSt2zRrk9LYPBMq02tmvzDm7m93e93Qdw/us2EJ5lusuC1ZZDErUVyzM5mXcvkSTv2rlh/EnmT+wHyAWt7FUfRIzoynZP1bJduMNDBuyOz09e/bjc5tyzD7z6n/Dae7n95z8NAqjt7lnRbsvJev5/4NBQcIax3Z5tktpbmAumQPfPWmO9PC534vFw15O69/f0lvxY2x04ZBDKdb1e6NqxmQrZKlHcpyiSGQag+HQ+B6LDlCUJOMuTVrnGcVKPB615PYQBAEAQBAEAQBAEB0kjbIxzHjVrgQR4hNdODjSa0ZiW0VB+NyVim/huPO6fFp/CR6L6SmxW1qR8tZU6bXAks4/8Ay5s9TzjONisBVvac9fhefPX/AKh4Krjvs2up8PdF7Ij3a43LlbM67AZ9uKy3s9h+lW2Q0k8mP+F37fJdzqe5DqXK+h3Bt7c+l8M9G2uA/wAlZI2K7NKll2rdBwY882/uP7JhZHch0vlEPiFDqn1x4f1PVslnK2MbL7ZAHvZCW15tPf3ddez17m68ei5l4srGpQ8+V/JzCz41Jws8uP8ABW8tbmyFuW5acXSyHXnwA7gOit1VxqgoRKk7p3TdkuWWB2yNmXY/t8HbimtWATY3Ockf+6a7u6jvPNZ0spd/SxbL71NmjH0o6oPVv70KbhbtzCZAWKjjFKw7skbhweNeLXD60V+yuFsdHwVldKuWqJ/MYupfpHO4SMRwa/xlQc6z/EflP10gqslXLtW8+T9RfGM4d6vjzXofbY7OSYS4BKSaUx++Z/Kf5h18ei9ZeMrY7cogxczsT9r3Wa5HI2RjXxuDmOALXA8x4rBaaejPo001qjuh0IAgCAIAgCAIAgCApH2lYU2qAyddmstZukoHfH4+n9NVfwLuiXQ+GZviGP1R7i5X0KBszmo8RkXx3RvY220w22d26eTvQn5arQyaXZHVcrgr4s1F6Ph8nn2jxMmFyL6r3dpC9u/BL3Sxnkfrw8l6otVsNfPzPFtPbl0/sXzY7N1tqMS/BZlwdaYz3HHnIwcnD8w/v4rOyKpUT7tfBerccit1WFZylSTF3pacz2PdGdN5h4Ed3l5LUqtVsFNeZ89fQ6bHBvXQjn7z3brGucTx0A1KkbS5OVxb2R7NndpLOz9ztI9ZKryO2g14OHiPB39VWyceN0fiX8S+VMtVwWzajBU9oKDc/gtHyObvSNYNO1A6dzxy/RUcXIlTPtWcF7LoV0O5Vz9Ss7PXpcVcbPG3fieN2aI8pGd4K0b6VbDTz8jGpynTZ1eXmj2ZvExUrDLFMl1C23tK7v5deO76fXJeca5zThP3lydzalXJTh7kuC4fZ/almxssMhBjgkDYz4DTXT0Wd4hBRsTXmavg9sp0uMuE9v2LWqBrhAEAQBAEAQBAEBxqgOHhrmFrgC08CD3ocZiO3uzUmDyf8NG51Oy4mDdGpB/k8/DxC3MXJVsNJcoy7KO1Pbhnooxvfs0/F7Wg0WQ/eY6xJoZmeLOz13i0+Q/QaRN/1uqjf19P3Jp9Pb0s2I+C9Vx5Iw0T2Sngbk2hmPjugcGDy1PVWe07N7H+n3yULL2tq9vj5/6PpiMfdzNn2ehEZH83OJ91nVzvoqS22FMdZFWvHnbLSKL82PD7BY7t7LvaMhKCBoPef0aPhb1WTKduZPRbI14V1YcNXuzPciIcpBNkqMLYJYzvW6rPwsBPCRn5e4juPQ8NGtyrark9fR/wVJRU11xWnqj07DbVHAZIQWXk46w4CQH/AGR7nj9+ijy8dWx1XKLGLY4PR8Fm2xxDaNxtyq0ezWiSd3k1/PTyPP5rmDkdceiXKM3xTF7Vncjw/r/s6YJwyNOzhJnDV47WqT8Mg46eRH7ruSnVNXr9TxhtX1yxpfmvzLRsJVfXwxfI0h80znkHu00b/wCKoZ81O3bhI1vCqnXRut22WRUzTCAIAgCAIAgCAID42WPkglZFKYpHMIY8AHdOnA8eCa77gxG59om1+Ptz0bU9UT15HRPJrAHUHTXw68u9bEMOiSUlruQOckR1rbbaO80tsZacNPdEGx/9oCmji0x/4lec5vzPHjatzJzllCtPalefe7NhcdfFx/cqaVkIL2noVnW5cF+wn2eStZ7TtFaZWhHEwxvG9/idyHp81Qtz9dqlqSRwlza9ESmQ2rx+Hq+wbNVmENHCTd+7HXxceq81YVlj6rmR2+IVVrooWpQ5zdyl/V5mt25zoNBq53Ty/QLS0hVDThFBTnbPfdk0Iqmx0bn2mxXc3Kwt9n3iYqzHDjv6cyR3dfU025ZT0W0F8y/FRx95byfyKln6kVaWOxT1FG2wyQA8SzudGerTw6gg96sVTb1jLlfaZIoppNcP5F/+z7KN2k2Yt7P23a2qbAYHH4mfD/ykaeRCo3x7F6tjwyeyrv0SrZHYwTtylZtYH2kTANHUFaFzi6m5caHzOOpq+Kj72v8A6a8xgaNGgDjroPEr5w+yR2Q6EAQBAEAQBAEAQBAUTbvZGjenOZfTfO9rQ2dkcpZvNHJ3DvH9PJXsS5/2+rT0KeZKyuPchHXTlFcox7L091zdmGSv8Z7b5R56OBH6K9Ki+X/Z8jLXi0dP7fzJh+2FqOHssfTq02DkGN1/TgF4j4fDmbbI5+L2texFL5kJfv28gdbtmSbXk1x930HJW66YV+6tDOtyLbX/AFJNn3p7N2rMRs23MoUxxdPZ93h0HM/oorMqEXpH2n8C3RhWTXVP2Y+rOtrN08RFJV2Zic2Rw0lyEo1kf0aPhH1p3qONE7X1X8eha/EV0roo/cr+Pxl3M3fZ6bHTSu4ve48G8eLnO7lYtthTHWR4qjK2Wi3LrtBsJFX2Fs14HusXq+tsP0/E4N95rR3AtGny1WVDMcr1J8PY2oY6rh08szXYnLuw+1GPuB+kTpBFMO50buB+XA+i0cmvrqkvQRejNxxOAbVzN7IvDT2khMDR8IdxcfPUkeXmsq3Ic641+hBRhKu+dr83t8CwKqaAQBAEAQBAEAQBAEAQHBGo0QFPzOxsMlh9mpYNeMgufEIS/Q/lGo+S0ac+UYqMlqYuT4TCUnOt9K9NNSvtq4CAn2jIXLDm82RV+z9OPFXHZkS92KX6mcq8KD9ubfw00Poc3Spf6oxMLJBynsntH/Lu+a8/hbJ/3Z/oj1+Mpqf9CpL4vkgsleuZKUPuWJJ3a+608h0A5K1XVCpeytCvO+y6XtvX78kS+D2Iu5JzZb+9UrHjoR948dB3evyVS/PhDaG7NHG8PsnvPZfM0XF4qniqwr0IWxM5kjm4+JPeVkWWTsl1SZuV1Qrj0wWx7HNDgQeII0IXgkMy2U+zNlfMT3s01joIrDzUqgahzQ47rn+mhDfn4K/dmuUFGHpuRxhvuacBoNFQJDlAEAQBAEAQBAEAQBAEAQHGiAistgMdlNXWIA2Xl2sfuu/v6qerJsq917FTIwqb/eW/r5kDHsJH233t95hHINjAdp5nUforb8SlptHczl4LDXeb0LBi8Djcb71aq3tOXaP953zKp2ZFlnvM06MSmn3I/wCST0HgoSycoAgOAAEBygCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgP//Z' alt='profile' />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>{user?.fullName}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick= {() => setOpen(true)} className='text-right' variant='outline'><Pen /></Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3'>
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className='my-5'>
          <h1 className='my-2'>Skills</h1>
          <div className='flex items-center gap-1'>
            {
              user?.profile?.skills?.length !== 0 ?
                user?.profile?.skills.map((item, idx) => (
                  <Badge key={idx}>{item}</Badge>
                )) :
                <span>NA</span>
            }
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className='text-md font-bold'>Resume</Label>
          {
            isResume ?
              <a target='blank' href= {`${user.profile.resume}`}
                className='text-blue-500 w-full hover:underline cursor-pointer'
              >
                {user.profile.resumeOriginalName}
              </a> : <span>NA</span>
          }
        </div>
      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
        <h1 className='font-bold text-lg my-5'>Aplied Jobs</h1>
        <AppliedJobTable/>
      </div>
      <UpdateProfileDialog open = {open} setOpen = {setOpen}/>
    </div>
  )
}

export default Profile